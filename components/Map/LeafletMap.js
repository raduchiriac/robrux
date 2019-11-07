import React, { Component } from 'react';
import { Map, TileLayer } from 'react-leaflet';
import L from 'leaflet';

import './LeafletMap.scss';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('../../public/marker.png'),
  iconUrl: require('../../public/marker.png'),
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  shadowUrl: '',
  // shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
  // shadowSize: [50, 64], // size of the shadow
  // shadowAnchor: [4, 62], // the same for the shadow
  // popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
});

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
