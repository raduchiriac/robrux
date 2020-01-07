import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { withStyles, makeStyles } from '@material-ui/core/styles';

const hover = { transform: 'scale(2.5)', backgroundColor: '#000', borderWidth: 3, zIndex: 1 };
const styles = theme => ({
  marker: {
    width: 20,
    height: 20,
    border: `2px solid ${theme.palette.error.contrastText}`,
    boxShadow: theme.shadows[2],
    borderRadius: '50%',
    userSelect: 'none',
    transformOrigin: 'center',
    position: 'absolute',
    transition: 'all 0.3s ease, top 0s, left 0s',
    backgroundColor: theme.palette.error.main,
    cursor: props => (props.onClick ? 'pointer' : 'default'),
    '&:hover': hover,
  },
});

const Marker = props => {
  const { classes, hovered, text, onClick, mapServiceProvider, payload, left, top, onMouseEnter, onMouseLeave } = props;

  if (mapServiceProvider == 'google') {
    const style = {
      left: '50%',
      top: '50%',
    };
    return (
      <div
        className={clsx('map-marker', 'map-marker__google', classes.marker)}
        style={hovered ? { ...hover, ...style } : style}
        title={text}
        {...(onClick ? { onClick: onClick } : {})}
      />
    );
  } else if (mapServiceProvider == 'osm' || mapServiceProvider == 'mapbox') {
    const style = {
      left: `${left}px`,
      top: `${top}px`,
    };
    return (
      <div
        className={clsx('map-marker', `map-marker__${mapServiceProvider}`, classes.marker)}
        style={hovered ? { ...hover, ...style } : style}
        title={text}
        onMouseEnter={() => onMouseEnter(payload)}
        onMouseLeave={() => onMouseLeave()}
        {...(onClick ? { onClick: onClick } : {})}
      />
    );
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
