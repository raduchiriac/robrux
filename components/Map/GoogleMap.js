import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import GoogleMapReact from 'google-map-react';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    width: '100%',
  },
}));

const GoogleMap = ({ children, ...props }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
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
};

GoogleMap.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
};

GoogleMap.defaultProps = {
  children: null,
};

export default GoogleMap;
