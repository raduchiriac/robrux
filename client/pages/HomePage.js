import React, { useState, useEffect } from 'react';
import { gql } from 'apollo-boost';
import Grid from '@material-ui/core/Grid';
import Map from '../components/Map/Map';
import client from '../_helpers/apollo';

import SmallGigsList from '../components/Gig/SmallGigsList';
import style from './HomePage.styles.scss';

const HomePage = () => {
  const limit = 20;
  const [loading, setLoading] = useState(true);
  const [bbox, setBbox] = useState([]);
  const [gigs, setGigs] = useState([]);
  const [hovered, setHovered] = useState(0);

  useEffect(() => {
    if (bbox.length) {
      fetchGigs();
    }
  }, [bbox]);

  const fetchGigs = () => {
    setLoading(true);
    setGigs([]);
    client
      .query({
        query: gql`
          {
            gigs(limit: ${limit}, sort: "-_rating", bbox: ${JSON.stringify(bbox)}) {
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
      .then(result => {
        setLoading(false);
        setGigs(result.data.gigs);
      });
  };

  const onMapBoundsChange = (center, zoom, bounds, marginBounds) => {
    // INFO: NW [lat, long] + NE + SE + SW + NW (again)
    const bbox = [
      [marginBounds.nw.lat, marginBounds.nw.lng],
      [marginBounds.ne.lat, marginBounds.ne.lng],
      [marginBounds.se.lat, marginBounds.se.lng],
      [marginBounds.sw.lat, marginBounds.sw.lng],
      [marginBounds.nw.lat, marginBounds.nw.lng],
    ];

    setBbox(bbox);
  };

  const onGigClick = gig => {
    console.log('You clicked a marker:', gig.title);
  };

  const onHoverEnters = (key, childProps) => {
    setHovered(key);
  };

  const onHoverLeaves = () => {
    setHovered(0);
  };

  return (
    <Grid container className={'home-page__container'}>
      <Map
        gigs={gigs}
        loading={loading}
        hovered={hovered}
        _onMapBoundsChange={onMapBoundsChange}
        _onMarkerClick={onGigClick}
        _onMapChildMouseEnter={onHoverEnters}
        _onMapChildMouseLeave={onHoverLeaves}
      />
      <SmallGigsList
        gigs={gigs}
        loading={loading}
        hovered={hovered}
        _onMouseEnter={onHoverEnters}
        _onMouseLeave={onHoverLeaves}
        _onClick={onGigClick}
      />
    </Grid>
  );
};

export default HomePage;
