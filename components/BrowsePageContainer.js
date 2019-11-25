import React, { useState, useEffect, useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import { useLazyQuery } from '@apollo/react-hooks';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Router from 'next/router';

import Map from './Map/Map';
import { GlobalContext } from '~/lib/contexts/GlobalContext';
import { LanguagesContext } from '~/lib/contexts/LanguagesContext';
import { SEARCH_BBOX_GIG } from '~/lib/graphql/gigs.strings';

import SmallGigsList from './Gig/SmallGigsList';
import './BrowsePageContainer.scss';

const BrowsePageContainer = props => {
  const [bbox, setBbox] = useState([]);
  const [searchingFor, setSearchingFor] = useState(props.searchingFor || '');
  const [searchingInLocation, setSearchingInLocation] = useState(props.inLocation || '');
  const [hovered, setHovered] = useState(0);
  const [searchBboxGigs, { data, error, loading }] = useLazyQuery(SEARCH_BBOX_GIG, {
    variables: { limit: 20, sort: '-_rating', bbox, searchingFor },
  });

  const { showMap } = useContext(GlobalContext).state;
  const { STRINGS } = useContext(LanguagesContext).state;

  useEffect(() => {
    if (bbox.length) {
      searchBboxGigs();
    }
  }, [bbox, searchBboxGigs]);

  let gigs = [];
  if (data && data.gigs) {
    if (data.gigs.length) {
      gigs = data.gigs;
    }
  }

  const onMapBoundsChange = (center, zoom, bounds, marginBounds) => {
    let bbox = [];
    if (typeof marginBounds == 'boolean') {
      bbox = [
        [bounds.sw[0], bounds.ne[1]],
        bounds.ne,
        [bounds.ne[0], bounds.sw[1]],
        bounds.sw,
        [bounds.sw[0], bounds.ne[1]],
      ];
    } else {
      // INFO: This is how coordinates are stored NW [lat, long] + NE + SE + SW + NW (again)
      bbox = [
        [marginBounds.nw.lat, marginBounds.nw.lng],
        [marginBounds.ne.lat, marginBounds.ne.lng],
        [marginBounds.se.lat, marginBounds.se.lng],
        [marginBounds.sw.lat, marginBounds.sw.lng],
        [marginBounds.nw.lat, marginBounds.nw.lng],
      ];
    }
    setBbox(bbox, searchingFor);
  };

  const onGigClick = gig => {
    Router.push({
      pathname: `/service/${gig.slug || gig._id}`,
    });
  };

  const onHoverEnters = (key, childProps) => {
    setHovered(key);
  };

  const onHoverLeaves = () => {
    setHovered(0);
  };

  return (
    <Grid container className="home-page__container" spacing={1}>
      {!!searchingFor && (
        <Grid container>
          <Box component="div" p={1}>
            <Typography variant="subtitle2" component="p">
              {`${STRINGS.BROWSE_RESULTS_OF} ${searchingFor}`}
            </Typography>
          </Box>
        </Grid>
      )}
      <Grid item xs={12} sm={12} md={6} lg={6} xl={4}>
        {showMap && (
          <Map
            gigs={gigs}
            city={searchingInLocation}
            loading={loading}
            hovered={hovered}
            mapServiceProvider="osm"
            _onMapBoundsChange={onMapBoundsChange}
            _onMarkerClick={onGigClick}
            _onMapChildMouseEnter={onHoverEnters}
            _onMapChildMouseLeave={onHoverLeaves}
          />
        )}
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={8}>
        <SmallGigsList
          gigs={gigs}
          loading={loading}
          hovered={hovered}
          _onMouseEnter={onHoverEnters}
          _onMouseLeave={onHoverLeaves}
          _onClick={onGigClick}
        />
      </Grid>
    </Grid>
  );
};

export default BrowsePageContainer;
