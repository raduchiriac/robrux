import React, { Component } from 'react';
import Map from 'pigeon-maps';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  mapContainer: {
    filter: 'saturate(3) contrast(0.9) brightness(1.1) hue-rotate(-20deg) invert(0)',
  },
}));

const OSMMap = ({ children, ...props }) => {
  const { defaultZoom, defaultCenter, mapServiceProvider, maxZoom, minZoom, onChange } = props;

  // TODO: How to read window.devicePixelRatio with SSR?
  const dpr = 2;

  const classes = useStyles();

  const providers = {
    osm: (x, y, z) => {
      return `https://stamen-tiles-c.a.ssl.fastly.net/terrain/${z}/${x}/${y}@2x.png`;
    },
    mapbox: (x, y, z) => {
      return `https://api.mapbox.com/v4/mapbox.outdoors/${z}/${x}/${y}${dpr >= 2 ? '@2x' : ''}.png?access_token=${
        process.env.MAPBOX_API
      }`;
    },
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
      animate={true}
      metaWheelZoom={false}
      twoFingerDrag={true}
      zoomSnap={false}
      mouseEvents={true}
      touchEvents={true}
      attribution={false}
      attributionPrefix={false}
      boxClassname={classes.mapContainer}
    >
      {children}
    </Map>
  );
};

export default OSMMap;
