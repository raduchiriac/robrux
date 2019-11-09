import React, { Fragment, Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import GoogleMap from './GoogleMap';
import MapMarker from './MapMarker';

import BRUX_CENTER from '../../lib/constants/BRUX_CENTER';
import GOOGLE_MAP_SKIN from '../../lib/constants/GOOGLE_MAP_SKIN';

import dynamic from 'next/dynamic';

const LeafletMapNoSSR = dynamic(() => import('./LeafletMap'), {
  ssr: false,
});

const styles = theme => ({
  mapContainer: {
    borderRadius: `${theme.shape.borderRadius * 3}px`,
    height: '300px',
    transition: 'all 0.3s ease',
    margin: theme.spacing(1),
    boxShadow: theme.shadows[1],
    overflow: 'hidden',
  },
});

const createMapOptions = maps => {
  return {
    maxZoom: 15,
    minZoom: 9,
    minZoomOverride: true,
    panControl: false,
    fullscreenControl: false,
    mapTypeControl: false,
    scrollwheel: false,
    styles: GOOGLE_MAP_SKIN,
    clickableIcons: false,
  };
};

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultZoom: 13,
    };

    this._apiIsLoaded = this._apiIsLoaded.bind(this);
  }

  _apiIsLoaded(map, maps) {
    this.setState({
      maps,
      map,
    });
  }

  render() {
    const {
      classes,
      gigs,
      hovered = 0,
      mapServiceProvider = 'google',
      _onMapBoundsChange = () => {},
      _onMarkerClick = () => {},
      _onMapChildMouseEnter = () => {},
      _onMapChildMouseLeave = () => {},
    } = this.props;

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

    const markers = gigs.map(gig => {
      return (
        <MapMarker
          mapServiceProvider={mapServiceProvider}
          key={gig._id}
          text={gig.title}
          id={gig._id}
          hovered={hovered === gig._id}
          onClick={() => _onMarkerClick(gig)}
          lat={gig.location.coordinates[0]}
          lng={gig.location.coordinates[1]}
        />
      );
    });

    return (
      <div className={classes.mapContainer}>
        {mapServiceProvider == 'google' && (
          <GoogleMap
            defaultZoom={this.state.defaultZoom}
            defaultCenter={BRUX_CENTER}
            resetBoundsOnResize={true}
            onChildMouseEnter={_onMapChildMouseEnter}
            onChildMouseLeave={_onMapChildMouseLeave}
            options={createMapOptions}
            yesIWantToUseGoogleMapApiInternals
            onChange={({ center, zoom, bounds, marginBounds }) =>
              _onMapBoundsChange(center, zoom, bounds, marginBounds)
            }
            onGoogleApiLoaded={({ map, maps }) => this._apiIsLoaded(map, maps)}
          >
            {markers}
          </GoogleMap>
        )}
        {mapServiceProvider == 'leaflet' && (
          <LeafletMapNoSSR defaultZoom={this.state.defaultZoom} defaultCenter={BRUX_CENTER}>
            {markers}
          </LeafletMapNoSSR>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(Map);
