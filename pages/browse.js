import React, { useState, useEffect, useContext } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import Grid from '@material-ui/core/Grid';
import { WebsiteHeaderAndFooterLayout } from '~/lib/layouts/WebsiteHeaderAndFooterLayout';
import withApollo from '~/lib/hocs/withApollo';
import Chip from '@material-ui/core/Chip';
import Box from '@material-ui/core/Box';
import Router, { useRouter } from 'next/router';
import { GlobalContext } from '~/lib/contexts/GlobalContext';
import { SEARCH_BBOX_GIG } from '~/lib/graphql/gigs.strings';
import { Helmet } from 'react-helmet';
import CITIES from '~/lib/constants/CITIES';
import Map from '~/components/Map/Map';
import SITE_NAME from '~/lib/constants/SITENAME';
import Breadcrumb from '~/components/Breadcrumb/Breadcrumb';
import SmallGigsList from '~/components/Gig/SmallGigsList';

const Browse = ({ search, category, inLocation }) => {
  const [bbox, setBbox] = useState([]);
  const [_searchingFor, setSearchingFor] = useState(search || '');
  const [_category, setCategory] = useState(+category || -1);
  const [_searchingInLocation, setSearchingInLocation] = useState(inLocation || '');
  const [hovered, setHovered] = useState(null);
  const router = useRouter();
  const [searchBboxGigs, { data, error, loading }] = useLazyQuery(SEARCH_BBOX_GIG, {
    variables: { limit: 20, sort: '-_rating', bbox, search: _searchingFor, category: _category },
  });

  const { showMap, STRINGS } = useContext(GlobalContext).state;

  // Update state when the props change
  // TODO: usePrevious()
  useEffect(() => {
    setSearchingFor(search);
  }, [search]);
  useEffect(() => {
    setCategory(+category || -1);
  }, [category]);
  useEffect(() => {
    setSearchingInLocation(inLocation);
  }, [inLocation]);

  useEffect(() => {
    if (bbox.length) {
      searchBboxGigs();
    }
  }, [bbox, _searchingFor, _category, searchBboxGigs]);

  let gigs = { data: (data && data.gigs) || undefined, loading };

  const onMapBoundsChange = (center, zoom, bounds, marginBounds) => {
    let bbox = [];
    if (typeof marginBounds == 'boolean') {
      if (isNaN(bounds.sw[0])) return;
      bbox = [
        [bounds.sw[0], bounds.ne[1]],
        bounds.ne,
        [bounds.ne[0], bounds.sw[1]],
        bounds.sw,
        [bounds.sw[0], bounds.ne[1]],
      ];
    } else {
      // INFO: The coordinates are stored as follows NW [lat, long] + NE + SE + SW + NW (again)
      bbox = [
        [marginBounds.nw.lat, marginBounds.nw.lng],
        [marginBounds.ne.lat, marginBounds.ne.lng],
        [marginBounds.se.lat, marginBounds.se.lng],
        [marginBounds.sw.lat, marginBounds.sw.lng],
        [marginBounds.nw.lat, marginBounds.nw.lng],
      ];
    }

    setBbox(bbox);
  };

  const onGigClick = gig => {
    Router.push({
      pathname: `/service/view/${gig.slug || gig._id}`,
    });
  };

  const onHoverEnters = (key, childProps) => {
    setHovered(key);
  };

  const onHoverLeaves = () => {
    setHovered(null);
  };

  const handleCategoryDeleteClick = () => {
    const { query } = router;
    delete query.category;
    Router.push({
      pathname: '/browse',
      query,
    });
  };

  return (
    <Grid container className="home-page__container" spacing={1}>
      <Helmet title={STRINGS.SEARCH_SIMPLE} />
      {!!_searchingFor && (
        <Grid container>
          <Breadcrumb
            links={[
              { href: '/', text: SITE_NAME },
              _searchingInLocation &&
                CITIES[_searchingInLocation] && {
                  href: `/browse?location=${_searchingInLocation}`,
                  text: CITIES[_searchingInLocation].name,
                },
              { href: '', text: _searchingFor },
            ].filter(Boolean)}
          />
        </Grid>
      )}
      <Grid item xs={12} sm={12} md={6} lg={6} xl={4}>
        {showMap && (
          <Map
            gigs={gigs}
            city={_searchingInLocation}
            hovered={hovered}
            mapServiceProvider="osm"
            maxZoom={16}
            _onMapBoundsChange={onMapBoundsChange}
            _onMarkerClick={onGigClick}
            _onMapChildMouseEnter={onHoverEnters}
            _onMapChildMouseLeave={onHoverLeaves}
          />
        )}
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={8}>
        {_category >= 0 && (
          <Grid container spacing={0}>
            <Box p={1}>
              <Chip
                color="primary"
                onDelete={handleCategoryDeleteClick}
                label={STRINGS.SERVICE_NEW_CATEGORIES[_category]}
              />
            </Box>
          </Grid>
        )}
        <SmallGigsList
          gigs={gigs}
          hovered={hovered}
          _onMouseEnter={onHoverEnters}
          _onMouseLeave={onHoverLeaves}
          _onClick={onGigClick}
        />
      </Grid>
    </Grid>
  );
};

Browse.getInitialProps = async ({ query }) => {
  return { search: query.search, inLocation: query.location, category: query.category };
};

Browse.Layout = WebsiteHeaderAndFooterLayout;

export default withApollo(Browse);
