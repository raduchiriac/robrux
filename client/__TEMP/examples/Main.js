import React, { Component, Fragment } from 'react';
import isEmpty from 'lodash.isempty';

// components:
import Marker from '../components/Marker';

// examples:
import GoogleMap from '../components/GoogleMap';

// consts
import LOS_ANGELES_CENTER from '../const/la_center';
import BRUX_CENTER from '../const/brux_center';
import STYLES from '../const/styles';


// Return map bounds based on list of places
const getMapBounds = (map, maps, places) => {
  const bounds = new maps.LatLngBounds();

  places.forEach((place) => {
    bounds.extend(new maps.LatLng(
      place.geometry.location.lat,
      place.geometry.location.lng,
    ));
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
  console.log({ center, zoom, bounds, marginBounds })
}

const createMapOptions = (maps) => {
  return {
    panControl: false,
    mapTypeControl: false,
    scrollwheel: false,
    styles: STYLES
  }
}

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      places: [],
    };
  }

  componentDidMount() {
    fetch('places.json')
      .then(response => response.json())
      .then(data => this.setState({ places: data.results }));
  }

  render() {
    const { places } = this.state;
    return (
      <Fragment>
        {!isEmpty(places) && (
          <div className="map-container" style={{
            borderRadius: '12px',
            height: '400px',
            width: 'calc(100% - 20px)',
            margin: '10px',
            overflow: 'hidden'
          }}
          >
            <GoogleMap
              defaultZoom={13}
              defaultCenter={BRUX_CENTER}
              resetBoundsOnResize={true}
              onChange={({ center, zoom, bounds, marginBounds }) => onChange(center, zoom, bounds, marginBounds)}
              yesIWantToUseGoogleMapApiInternals
              options={createMapOptions}
              // onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps, places)}
            >
              {places.map(place => (
                <Marker
                  key={place.id}
                  text={place.name}
                  lat={place.geometry.location.lat}
                  lng={place.geometry.location.lng}
                />
              ))}
            </GoogleMap>
          </div>
        )}
      </Fragment>
    );
  }
}

export default Main;
