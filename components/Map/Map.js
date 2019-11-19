import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import BRUX_CENTER from '~/lib/constants/BRUX_CENTER';
import GOOGLE_MAP_SKIN from '~/lib/constants/GOOGLE_MAP_SKIN';

import GoogleMap from './GoogleMap';
import OSMMap from './OSMMap';
import Marker from './Marker';

const styles = theme => ({
  mapContainer: {
    borderRadius: `${theme.shape.borderRadius * 3}px`,
    transition: 'all 0.3s ease',
    margin: theme.spacing(1),
    boxShadow: theme.shadows[1],
    overflow: 'hidden',
  },
});

const Map = props => {
  const {
    classes,
    gigs,
    hovered = 0,
    height = 300,
    mapServiceProvider = 'google',
    _onMapBoundsChange = () => {},
    _onMarkerClick = () => {},
    _onMapChildMouseEnter = () => {},
    _onMapChildMouseLeave = () => {},
  } = props;

  const options = {
    defaultZoom: 13,
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
  const createMapOptions = () => {
    return options;
  };

  const apiIsLoaded = (map, maps) => {};

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
      <Marker
        mapServiceProvider={mapServiceProvider}
        key={gig._id}
        payload={gig._id}
        id={gig._id}
        text={gig.title}
        hovered={hovered === gig._id}
        onClick={() => _onMarkerClick(gig)}
        onMouseEnter={_onMapChildMouseEnter}
        onMouseLeave={_onMapChildMouseLeave}
        anchor={[gig.location.coordinates[0], gig.location.coordinates[1]]}
        lat={gig.location.coordinates[0]}
        lng={gig.location.coordinates[1]}
      />
    );
  });

  return (
    <div className={classes.mapContainer} style={{ height }}>
      {mapServiceProvider == 'google' && (
        <GoogleMap
          yesIWantToUseGoogleMapApiInternals
          defaultCenter={BRUX_CENTER}
          defaultZoom={options.defaultZoom}
          resetBoundsOnResize={true}
          onChildMouseEnter={_onMapChildMouseEnter}
          onChildMouseLeave={_onMapChildMouseLeave}
          options={createMapOptions}
          onChange={({ center, zoom, bounds, marginBounds }) => _onMapBoundsChange(center, zoom, bounds, marginBounds)}
          onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps)}
        >
          {markers}
        </GoogleMap>
      )}
      {(mapServiceProvider == 'osm' || mapServiceProvider == 'mapbox') && (
        <OSMMap
          mapServiceProvider={mapServiceProvider}
          defaultCenter={BRUX_CENTER}
          defaultZoom={options.defaultZoom}
          maxZoom={options.maxZoom}
          minZoom={options.minZoom}
          onChange={({ center, zoom, bounds, initial }) => _onMapBoundsChange(center, zoom, bounds, initial)}
        >
          {markers}
        </OSMMap>
      )}
    </div>
  );
};

export default withStyles(styles)(Map);
