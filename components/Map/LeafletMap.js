import React, { Component } from 'react';
import { Map, TileLayer } from 'react-leaflet';

import './LeafletMap.scss';

const LeafletMap = ({ children, ...props }) => {
  const { defaultZoom, defaultCenter } = props;
  return (
    <Map center={defaultCenter} zoom={defaultZoom}>
      <TileLayer
        attribution=""
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
      />
      {children}
    </Map>
  );
};

export default LeafletMap;
