import React from 'react';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';

import './GoogleMap.scss';

const GoogleMap = ({ children, ...props }) => (
  <div className="map-container__google">
    <GoogleMapReact
      bootstrapURLKeys={{
        key: process.env.GOOGLE_MAPS_API,
      }}
      {...props}
    >
      {children}
    </GoogleMapReact>
  </div>
);

GoogleMap.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
};

GoogleMap.defaultProps = {
  children: null,
};

export default GoogleMap;
