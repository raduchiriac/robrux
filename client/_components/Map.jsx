import React, { Component, Fragment } from 'react';

// components:
import Marker from './Marker';

// examples:
import GoogleMap from './GoogleMap';

// consts
import BRUX_CENTER from '../_constants/brux_center';
import STYLES from '../_constants/styles';
import config from 'config';
import ApolloClient, { gql } from 'apollo-boost';
import './Map.css';

// Return map bounds based on list of places
const getMapBounds = (map, maps, places) => {
  const bounds = new maps.LatLngBounds();

  places.forEach(place => {
    bounds.extend(new maps.LatLng(place.location.coordinates[0], place.location.coordinates[1]));
  });
  return bounds;
};

// Re-center map when resizing the window
const bindResizeListener = (map, maps, bounds) => {
  maps.event.addDomListenerOnce(map, 'idle', () => {
    maps.event.addDomListener(window, 'resize', () => {
      map.fitBounds(bounds);
    });
  });
};

// Fit map to its bounds after the api is loaded
const apiIsLoaded = (map, maps, places) => {
  // Get bounds by our places
  const bounds = getMapBounds(map, maps, places);
  // Fit map to bounds
  map.fitBounds(bounds);
  // Bind the resize listener
  bindResizeListener(map, maps, bounds);
};

const onChange = (center, zoom, bounds, marginBounds) => {
  console.log({ center, zoom, bounds, marginBounds });
};

const createMapOptions = maps => {
  return {
    panControl: false,
    mapTypeControl: false,
    scrollwheel: false,
    styles: STYLES,
  };
};

class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      places: [],
    };
  }

  componentDidMount() {
    const client = new ApolloClient({
      uri: `${config.WEBPACK_SERVER_URL}/graphql`,
    });
    client
      .query({
        query: gql`
          {
            gigs {
              _id
              _providerName
              _rating
              title
              price
              images
              location {
                coordinates
              }
            }
          }
        `,
      })
      .then(result => this.setState({ places: result.data.gigs }));
  }

  render() {
    const { places } = this.state;
    return (
      <Fragment>
        {places.length && (
          <div
            className="map-container"
            style={{
              borderRadius: '12px',
              height: '400px',
              width: 'calc(100% - 20px)',
              margin: '10px',
              overflow: 'hidden',
            }}
          >
            <GoogleMap
              defaultZoom={13}
              defaultCenter={BRUX_CENTER}
              resetBoundsOnResize={true}
              onChange={({ center, zoom, bounds, marginBounds }) => onChange(center, zoom, bounds, marginBounds)}
              yesIWantToUseGoogleMapApiInternals
              options={createMapOptions}
              onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps, places)}
            >
              {places.map(place => {
                return (
                  <Marker
                    key={place._id}
                    text={place.title}
                    lat={place.location.coordinates[0]}
                    lng={place.location.coordinates[1]}
                  />
                );
              })}
            </GoogleMap>
          </div>
        )}
        {places.length &&
          places.map(place => {
            return (
              <div className="pro" key="{place._id}">
                <h4 class="title">{place.title}</h4>
                <img class="avatar" src={place.images[0]} alt="" />
                <p className="name">{place._providerName}</p>
                <p className="rating">{place._rating}</p>
                <div className="price">{place.price}€/ora</div>
              </div>
            );
          })}
      </Fragment>
    );
  }
}

export { Map };
