import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { useLazyQuery } from '@apollo/react-hooks';
import Router from 'next/router';

import Map from './Map/Map';
import { GlobalContext } from '../lib/contexts/GlobalContext';
import { SEARCH_BBOX_GIG } from '../lib/graphql/gigs.strings';

import SmallGigsList from './Gig/SmallGigsList';
import './IndexPageContainer.styles.scss';

const IndexPageContainer = props => {
  const [bbox, setBbox] = useState([]);
  const [hovered, setHovered] = useState(0);
  const [searchBboxGigs, { data, error, loading }] = useLazyQuery(SEARCH_BBOX_GIG, {
    variables: { limit: 20, sort: '-_rating', bbox },
  });

  const { showMap } = React.useContext(GlobalContext).state;

  useEffect(() => {
    if (bbox.length) {
      searchBboxGigs();
    }
  }, [bbox]);

  let gigs = [];
  if (data && data.gigs) {
    if (data.gigs.length) {
      gigs = data.gigs;
    }
  }

  const onMapBoundsChange = (center, zoom, bounds, marginBounds) => {
    // INFO: This is how coordinates are stored NW [lat, long] + NE + SE + SW + NW (again)
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
    Router.push({
      pathname: `/service/${gig._id}`,
    });
  };

  const onHoverEnters = (key, childProps) => {
    setHovered(key);
  };

  const onHoverLeaves = () => {
    setHovered(0);
  };

  return (
    <Grid container className={'home-page__container'}>
      {showMap && (
        <Map
          gigs={gigs}
          loading={loading}
          hovered={hovered}
          _onMapBoundsChange={onMapBoundsChange}
          _onMarkerClick={onGigClick}
          _onMapChildMouseEnter={onHoverEnters}
          _onMapChildMouseLeave={onHoverLeaves}
        />
      )}
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

export default IndexPageContainer;
