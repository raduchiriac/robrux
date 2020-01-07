import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import GoogleMap from './GoogleMap';
import OSMMap from './OSMMap';
import Marker from './Marker';
import CITIES from '~/lib/constants/CITIES';
import GOOGLE_MAP_SKIN from '~/lib/constants/GOOGLE_MAP_SKIN';

const styles = theme => ({
  mapContainer: {
    borderRadius: `${theme.shape.borderRadius * 3}px`,
    transition: theme.transitions.create(),
    margin: theme.spacing(1),
    boxShadow: theme.shadows[1],
    overflow: 'hidden',
  },
});

const Map = props => {
  const {
    classes,
    styles,
    gigs,
    hovered = 0,
    height = 300,
    center = [],
    city = 'bruxelles',
    defaultZoom = 13,
    maxZoom = 15,
    minZoom = 9,
    mapServiceProvider = 'osm',
    _onMapBoundsChange = () => {},
    _onMarkerClick = () => {},
    _onMapChildMouseEnter = () => {},
    _onMapChildMouseLeave = () => {},
  } = props;

  const options = {
    defaultZoom: defaultZoom,
    maxZoom: maxZoom,
    minZoom: minZoom,
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

  const markers = (gigs.data || []).map(gig => {
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

  const defaultCenter =
    center.filter(Boolean).length === 2 ? center : CITIES[city] ? CITIES[city].center : CITIES['bruxelles'].center;

  return (
    <div className={classes.mapContainer} style={{ ...styles, height }}>
      {mapServiceProvider == 'google' && (
        <GoogleMap
          yesIWantToUseGoogleMapApiInternals
          center={defaultCenter}
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
          defaultCenter={defaultCenter}
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
