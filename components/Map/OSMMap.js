import React, { Fragment } from 'react';
import Map from 'pigeon-maps';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  mapTiles_gmap: {
    filter: `invert(0)`,
  },
  mapTiles_osm: {
    filter: `contrast(0.88) brightness(0.88) invert(${
      theme.palette.type == 'light' ? 0 : 1
    }) sepia(1) hue-rotate(180deg) saturate(0.8)`,
  },
  mapTiles_mapbox: {
    filter: `invert(0)`,
  },
}));

const OSMMap = ({
  children,
  defaultZoom,
  defaultCenter,
  mapServiceProvider,
  maxZoom,
  minZoom,
  blockDrag,
  onChange = () => {},
}) => {
  const classes = useStyles();

  // TODO: How to read window.devicePixelRatio with SSR?
  const dpr = 2;

  const providers = {
    gmap: (x, y, z) => `https://mt0.google.com/vt/lyrs=m&x=${x}&y=${y}&z=${z}`,
    osm: (x, y, z) => `https://stamen-tiles.a.ssl.fastly.net/toner/${z}/${x}/${y}${dpr >= 2 ? '@2x' : ''}.png`,
    mapbox: (x, y, z) =>
      `https://api.mapbox.com/v4/mapbox.outdoors/${z}/${x}/${y}${dpr >= 2 ? '@2x' : ''}.png?access_token=${
        process.env.MAPBOX_API
      }`,
  };

  return (
    <Map
      limitBounds="edge"
      center={defaultCenter}
      zoom={defaultZoom}
      minZoom={minZoom}
      maxZoom={maxZoom}
      provider={providers[mapServiceProvider]}
      onBoundsChanged={onChange}
      animate
      zoomSnap
      metaWheelZoom={false}
      twoFingerDrag={!blockDrag}
      mouseEvents={!blockDrag}
      touchEvents={!blockDrag}
      attribution={false}
      attributionPrefix={false}
      boxClassname={classes[`mapTiles_${mapServiceProvider}`]}
    >
      {children}
    </Map>
  );
};

export default OSMMap;
