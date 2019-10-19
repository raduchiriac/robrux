import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import './Marker.scss';
import { withStyles } from '@material-ui/core/styles';

const hover = { transform: 'scale(2.5)', backgroundColor: '#000', borderWidth: '2px', zIndex: 1 };
const styles = theme => ({
  marker: {
    backgroundColor: (theme.custom_palette && theme.custom_palette.alternateColor) || 'black',
    cursor: props => (props.onClick ? 'pointer' : 'default'),
    '&:hover': hover,
  },
});

const Marker = props => {
  const { classes } = props;
  return (
    <div
      className={clsx('map-marker', classes.marker)}
      style={props.hovered ? hover : {}}
      title={props.text}
      {...(props.onClick ? { onClick: props.onClick } : {})}
    />
  );
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
