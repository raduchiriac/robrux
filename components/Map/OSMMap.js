import React, { Component } from 'react';
import Map from 'pigeon-maps';

import './OSMMap.scss';

const OSMMap = ({ children, ...props }) => {
  const { defaultZoom, defaultCenter, mapServiceProvider, maxZoom, minZoom, onChange } = props;

  // TODO: How to read window.devicePixelRatio?
  const dpr = 2;

  const providers = {
    osm: (x, y, z) => {
      return `https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/${z}/${y}/${x}`;
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
      boxClassname={`map-container__${mapServiceProvider}`}
    >
      {children}
    </Map>
  );
};

export default OSMMap;
