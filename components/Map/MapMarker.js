import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

// import { Marker } from 'react-leaflet';
// import L from 'leaflet';
// delete L.Icon.Default.prototype._getIconUrl;

// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: '/marker.png',
//   iconUrl: '/marker.png',
//   iconSize: [32, 32],
//   iconAnchor: [16, 16],
//   shadowUrl: '',
//   // shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
//   // shadowSize: [50, 64], // size of the shadow
//   // shadowAnchor: [4, 62], // the same for the shadow
//   // popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
// });

import './MapMarker.scss';

const hover = { transform: 'scale(2.5)', backgroundColor: '#000', borderWidth: '2px', zIndex: 1 };
const styles = theme => ({
  marker: {
    backgroundColor: (theme.custom_palette && theme.custom_palette.alternateColor) || 'black',
    cursor: props => (props.onClick ? 'pointer' : 'default'),
    '&:hover': hover,
  },
});

const MapMarker = props => {
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
    return (
      <></>
      // <Marker
      //   animate={true}
      //   position={[lat, lng]}
      //   onMouseOver={evt => evt.target._icon.classList.add('leaflet-marker-icon--hover')}
      //   onMouseOut={evt => evt.target._icon.classList.remove('leaflet-marker-icon--hover')}
      // ></Marker>
    );
  }
};

MapMarker.defaultProps = {
  onClick: null,
  hoveredGig: null,
};

MapMarker.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
};

export default withStyles(styles)(MapMarker);
