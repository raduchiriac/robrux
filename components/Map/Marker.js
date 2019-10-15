import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const hover = { transform: 'scale(2.5)', backgroundColor: '#000', borderWidth: '2px', zIndex: 1 };
const styles = theme => ({
  marker: {
    transition: 'all 0.3s ease',
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '18px',
    height: '18px',
    backgroundColor: (theme.custom_palette && theme.custom_palette.alternateColor) || 'black',
    border: '3px solid #fff',
    boxShadow: '2px 2px 2px 0px rgba(0, 0, 0, 0.3)',
    borderRadius: '50%',
    userSelect: 'none',
    transform: 'translate(-50%, -50%)',
    cursor: props => (props.onClick ? 'pointer' : 'default'),
    transformOrigin: '75% 75%',
    '&:hover': hover,
  },
});

const Marker = props => {
  const { classes } = props;
  return (
    <div
      className={classes.marker}
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
