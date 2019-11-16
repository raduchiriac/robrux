// const LeafletMap = ({ children, ...props }) => {
//   const { defaultZoom, defaultCenter } = props;
//   return (
//     <Map center={[50.879, 4.6997]} zoom={12} width={600} height={400}>
//       {children}
//     </Map>
//   );
// };

import React, { Component } from 'react';
import Map from 'pigeon-maps';

import './OSMMap.scss';

export default class OSMMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      center: props.defaultCenter,
      zoom: props.defaultZoom,
      height: props.defaultHeight,
      provider: 'osm',
      dpr: window.devicePixelRatio,
      metaWheelZoom: false,
      twoFingerDrag: false,
      animate: true,
      animating: false,
      zoomSnap: true,
      mouseEvents: true,
      touchEvents: true,
      minZoom: 1,
      maxZoom: 18,
      dragAnchor: [48.8565, 2.3475],
    };
  }

  providers = () => ({
    osm: (x, y, z) => {
      return `https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/${z}/${y}/${x}`;
    },
    mapbox: (x, y, z) => {
      return `https://api.mapbox.com/v4/mapbox.outdoors/${z}/${x}/${y}${
        this.state.dpr >= 2 ? '@2x' : ''
      }.png?access_token=${process.env.MAPBOX_API}`;
    },
  });

  handleBoundsChange = ({ center, zoom, bounds, initial }) => {
    if (initial) {
      console.log('Got initial bounds: ', bounds);
    }
    this.setState({ center, zoom });
  };

  handleClick = ({ event, latLng, pixel }) => {
    console.log('Map clicked!', latLng, pixel);
  };

  handleMarkerClick = ({ event, payload, anchor }) => {
    console.log(`Marker #${payload} clicked at: `, anchor);
  };

  render() {
    const {
      center,
      zoom,
      provider,
      animate,
      metaWheelZoom,
      twoFingerDrag,
      zoomSnap,
      mouseEvents,
      touchEvents,
      animating,
      minZoom,
      maxZoom,
    } = this.state;

    return (
      <div style={{ textAlign: 'center' }}>
        <Map
          limitBounds="edge"
          center={center}
          zoom={zoom}
          provider={this.providers()[provider]}
          dprs={[1, 2]}
          onBoundsChanged={this.handleBoundsChange}
          onClick={this.handleClick}
          onAnimationStart={this.handleAnimationStart}
          onAnimationStop={this.handleAnimationStop}
          animate={animate}
          metaWheelZoom={metaWheelZoom}
          twoFingerDrag={twoFingerDrag}
          zoomSnap={zoomSnap}
          mouseEvents={mouseEvents}
          touchEvents={touchEvents}
          minZoom={minZoom}
          maxZoom={maxZoom}
          attribution={null}
          height={this.state.height}
          boxClassname=""
        >
          {this.props.children}
        </Map>
      </div>
    );
  }
}
