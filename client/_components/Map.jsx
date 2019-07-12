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

// Return map bounds based on list of gigs
const getMapBounds = (map, maps, gigs) => {
  const bounds = new maps.LatLngBounds();

  gigs.forEach(place => {
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
const apiIsLoaded = (map, maps, gigs) => {
  // Get bounds by our gigs
  const bounds = getMapBounds(map, maps, gigs);
  // Fit map to bounds
  map.fitBounds(bounds);
  // Bind the resize listener
  bindResizeListener(map, maps, bounds);
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
      limit: 20,
      gigs: [],
      bbox: [],
    };
    this._fetchGigs = this._fetchGigs.bind(this);
    this._onChange = this._onChange.bind(this);
    this._onMarkerClick = this._onMarkerClick.bind(this);
    this._onChildMouseEnter = this._onChildMouseEnter.bind(this);
    this._onChildMouseLeave = this._onChildMouseLeave.bind(this);
  }

  _fetchGigs() {
    const client = new ApolloClient({
      uri: `${config.WEBPACK_SERVER_URL}/graphql`,
    });

    client
      .query({
        query: gql`
          {
            gigs(limit: ${this.state.limit}, sort: "-_rating", bbox: ${JSON.stringify(this.state.bbox)}) {
              _id
              title
              location {
                coordinates
              }
            }
          }
        `,
      })
      .then(result => this.setState({ gigs: result.data.gigs }));
  }

  _onChange(center, zoom, bounds, marginBounds) {
    // NW [lat, long] + NE + SE + SW + NW (again)
    const bbox = [
      [marginBounds.nw.lat, marginBounds.nw.lng],
      [marginBounds.ne.lat, marginBounds.ne.lng],
      [marginBounds.se.lat, marginBounds.se.lng],
      [marginBounds.sw.lat, marginBounds.sw.lng],
      [marginBounds.nw.lat, marginBounds.nw.lng],
    ];
    this.setState({ bbox }, () => {
      this._fetchGigs();
    });
  }

  _onMarkerClick(gig) {
    console.log(gig);
  }

  _onChildMouseEnter(key, childProps) {
    console.log(key, childProps);
    // const index = this.props.markers.findIndex(m => m.get('_id') === markerId);
    // if (this.props.onMarkerHover) {
    //   this.props.onMarkerHover(index);
    // }
  }

  _onChildMouseLeave() {
    if (this.props.onMarkerHover) {
      // this.props.onMarkerHover(-1);
    }
  }

  componentDidMount() {}

  render() {
    const { gigs } = this.state;
    return (
      <Fragment>
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
            onChildMouseEnter={this._onChildMouseEnter}
            onChildMouseLeave={this._onChildMouseLeave}
            onChange={({ center, zoom, bounds, marginBounds }) => this._onChange(center, zoom, bounds, marginBounds)}
            yesIWantToUseGoogleMapApiInternals
            options={createMapOptions}
            // onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps, gigs)}
          >
            {gigs.map(gig => {
              return (
                <Marker
                  key={gig._id}
                  text={gig.title}
                  lat={gig.location.coordinates[0]}
                  lng={gig.location.coordinates[1]}
                  onClick={() => this._onMarkerClick(gig)}
                />
              );
            })}
          </GoogleMap>
        </div>
      </Fragment>
    );
  }
}

export default Map;
