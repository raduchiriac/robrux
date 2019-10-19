import { WithHeaderLayout } from '../../lib/layouts/WithHeaderLayout';
import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { GET_ONE_GIG } from '../../lib/graphql/gigs.strings';
import { useLazyQuery } from '@apollo/react-hooks';
import StaticMap from '../../components/Map/StaticMap';

const Service = ({ service }) => {
  const [searchGig, { data, error, loading }] = useLazyQuery(GET_ONE_GIG, {
    variables: { idOrSlug: service.idOrSlug },
  });
  let gig = {};

  useEffect(() => {
    if (service.idOrSlug) {
      searchGig();
    }
  }, [service, searchGig]);

  if (data && data.oneGig) {
    gig = data.oneGig;
  }

  return (
    <Grid container alignItems="center" spacing={2}>
      <Grid item xs={12} sm={4} md={4} lg={3}>
        <Paper>
          <StaticMap gig={gig} size={[300, 450]} zoom={16} />
        </Paper>
        <Paper>Reviews</Paper>
      </Grid>
      <Grid item xs={12} sm={8} md={8} lg={9}>
        <Paper>
          <h1>Title magic carpet maker</h1>
        </Paper>
        <Paper>{/* <img src="/robrux-full.jpeg" alt="" /> */}</Paper>
        <Paper>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis delectus minima velit assumenda, quaerat
          obcaecati, recusandae dolorum corrupti repellat id aspernatur facere. A numquam quasi ipsa beatae culpa,
          necessitatibus suscipit.
        </Paper>
        <Paper>
          <button>Buy</button>
        </Paper>
      </Grid>
    </Grid>
  );
};

Service.getInitialProps = async ({ query: { id } }, res) => {
  return { service: { idOrSlug: id } };
};

Service.Layout = WithHeaderLayout;

export default Service;
