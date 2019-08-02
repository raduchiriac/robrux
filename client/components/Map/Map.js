import React, { Component } from 'react';
import ApolloClient, { gql } from 'apollo-boost';
import config from 'config';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Back from '@material-ui/icons/KeyboardArrowLeft';

import GoogleMap from './GoogleMap';
import Marker from './Marker';
import SmallGigsList from './SmallGigsList';

import BRUX_CENTER from '../../_helpers/constants/BRUX_CENTER';
import GOOGLE_MAP_SKIN from '../../_helpers/constants/GOOGLE_MAP_SKIN';

const styles = theme => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    transition: 'all 0.3s ease',
    flexDirection: 'column',
  },
  rootProduct: {
    transition: 'all 0.3s ease',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',
  },
  mapContainer: {
    borderRadius: `${theme.shape.borderRadius * 3}px`,
    height: '300px',
    transition: 'all 0.3s ease',
    margin: theme.spacing(1),
    boxShadow: theme.shadows[1],
    overflow: 'hidden',
  },
  mapContainerProduct: {
    boxShadow: 'none',
    transition: 'all 0.3s ease',
    margin: 0,
    marginRight: theme.spacing(1),
    overflow: 'hidden',
    borderRadius: 0,
    flex: '0 1 30%',
    height: '100vh',
  },
});

// Return map bounds based on list of gigs
const getMapBounds = (map, maps, gigs) => {
  const bounds = new maps.LatLngBounds();

  gigs.forEach(place => {
    bounds.extend(new maps.LatLng(place.location.coordinates[0], place.location.coordinates[1]));
  });
  return bounds;
};

// Re-center map when resizing the window
const bindResizeListener = (map, maps, bounds) => {
  maps.event.addDomListenerOnce(map, 'idle', () => {
    maps.event.addDomListener(window, 'resize', () => {
      map.fitBounds(bounds);
    });
  });
};

const createMapOptions = maps => {
  return {
    maxZoom: 15,
    minZoom: 9,
    minZoomOverride: true,
    panControl: false,
    fullscreenControl: false,
    mapTypeControl: false,
    scrollwheel: false,
    styles: GOOGLE_MAP_SKIN,
    clickableIcons: false,
  };
};

class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      limit: 20,
      gigs: [],
      bbox: [],
      hoveredGig: null,
      hoveredIndex: null,
      autoRefresh: true,
      loading: false,
    };
    this._fetchGigs = this._fetchGigs.bind(this);
    this._onChange = this._onChange.bind(this);
    this._apiIsLoaded = this._apiIsLoaded.bind(this);
    this._onMarkerClick = this._onMarkerClick.bind(this);
    this._onChildMouseEnter = this._onChildMouseEnter.bind(this);
    this._onChildMouseLeave = this._onChildMouseLeave.bind(this);
    this._onPaperEnter = this._onPaperEnter.bind(this);
    this._onPaperLeave = this._onPaperLeave.bind(this);
  }

  _apiIsLoaded(map, maps) {
    this.setState({
      maps,
      map,
    });
    // Bind the resize listener
    // bindResizeListener(map, maps, bounds);
  }

  _fetchGigs() {
    // TODO: Initiate once
    const client = new ApolloClient({
      uri: `${config.WEBPACK_SERVER_URL}/graphql`,
    });

    this.setState({ loading: true, gigs: [] }, () => {
      client
        .query({
          query: gql`
          {
            gigs(limit: ${this.state.limit}, sort: "-_rating", bbox: ${JSON.stringify(this.state.bbox)}) {
              _id
              _providerName
              _rating
              title
              price
              images
              location {
                coordinates
              }
            }
          }
        `,
        })
        .then(result => this.setState({ gigs: result.data.gigs, loading: false }));
    });
  }

  _onChange(center, zoom, bounds, marginBounds) {
    // NW [lat, long] + NE + SE + SW + NW (again)
    const bbox = [
      [marginBounds.nw.lat, marginBounds.nw.lng],
      [marginBounds.ne.lat, marginBounds.ne.lng],
      [marginBounds.se.lat, marginBounds.se.lng],
      [marginBounds.sw.lat, marginBounds.sw.lng],
      [marginBounds.nw.lat, marginBounds.nw.lng],
    ];

    this.setState({ bbox }, () => {
      if (this.state.autoRefresh) {
        this._fetchGigs();
      }
    });
  }

  _onMarkerClick(gig) {
    console.log('You clicked a marker:', gig._id);
  }

  _onChildMouseEnter(key, childProps) {
    const index = this.state.gigs.findIndex(m => m._id === key);
    this.setState({ hoveredIndex: index });
  }

  _onChildMouseLeave() {
    this.setState({ hoveredIndex: null });
  }

  _onPaperEnter(gig) {
    this.setState({ hoveredGig: gig._id });
  }

  _onPaperLeave() {
    this.setState({ hoveredGig: null });
  }

  render() {
    const { gigs } = this.state;
    const { classes } = this.props;
    return (
      <div className={this.state.product ? classes.rootProduct : classes.root}>
        <div className={this.state.product ? classes.mapContainerProduct : classes.mapContainer}>
          <GoogleMap
            defaultZoom={13}
            defaultCenter={BRUX_CENTER}
            resetBoundsOnResize={true}
            onChildMouseEnter={this._onChildMouseEnter}
            onChildMouseLeave={this._onChildMouseLeave}
            onChange={({ center, zoom, bounds, marginBounds }) => this._onChange(center, zoom, bounds, marginBounds)}
            yesIWantToUseGoogleMapApiInternals
            options={createMapOptions}
            onGoogleApiLoaded={({ map, maps }) => this._apiIsLoaded(map, maps)}
          >
            {gigs.map(gig => {
              return (
                <Marker
                  key={gig._id}
                  text={gig.title}
                  id={gig._id}
                  hovered={this.state.hoveredGig === gig._id}
                  onClick={() => this._onMarkerClick(gig)}
                  lat={gig.location.coordinates[0]}
                  lng={gig.location.coordinates[1]}
                />
              );
            })}
          </GoogleMap>
        </div>
        {!this.state.product && (
          <SmallGigsList loading={this.state.loading} gigs={(gigs.length && gigs) || [false, false]} />
        )}
        {this.state.product && (
          <div>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                this.setState({ product: false, autoRefresh: true, hoveredGig: null, hoveredIndex: null });
              }}
            >
              <Back />
              Înapoi
            </Button>
            <h2>{this.state.gigs[0].title}</h2>
          </div>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(Map);
