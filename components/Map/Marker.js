import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Marker as LeafletMarker } from 'react-leaflet';

import './Marker.scss';

const hover = { transform: 'scale(2.5)', backgroundColor: '#000', borderWidth: '2px', zIndex: 1 };
const styles = theme => ({
  marker: {
    backgroundColor: (theme.custom_palette && theme.custom_palette.alternateColor) || 'black',
    cursor: props => (props.onClick ? 'pointer' : 'default'),
    '&:hover': hover,
  },
});

const Marker = props => {
  const { classes, hovered, text, onClick, lat, lng, mapServiceProvider } = props;

  if (mapServiceProvider == 'google') {
    return (
      <div
        className={clsx('map-marker', classes.marker)}
        style={hovered ? hover : {}}
        title={text}
        {...(onClick ? { onClick: onClick } : {})}
      />
    );
  } else if (mapServiceProvider == 'leaflet') {
    return <LeafletMarker position={[lat, lng]}></LeafletMarker>;
  }
};

Marker.defaultProps = {
  onClick: null,
  hoveredGig: null,
};

Marker.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
};

export default withStyles(styles)(Marker);
