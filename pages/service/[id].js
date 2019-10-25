import { WithHeaderLayout } from '../../lib/layouts/WithHeaderLayout';
import withApollo from '../../lib/hocs/withApollo';
import React, { useState, useEffect, Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { GET_ONE_GIG } from '../../lib/graphql/gigs.strings';
import { useLazyQuery } from '@apollo/react-hooks';
import StaticMap from '../../components/Map/StaticMap';
import StarRating from '../../components/Rating/StarRating';
import Carousel from '../../components/Carousel/Carousel';
import Button from '@material-ui/core/Button';

import './id.scss';

const useStyles = makeStyles(theme => ({
  button: {
    backgroundColor: theme.custom_palette && theme.custom_palette.alternateColor,
  },
  servicePrice: {
    background: theme.custom_palette && theme.custom_palette.alternateColor,
  },
}));

const Service = ({ params }) => {
  let gig = false;
  const classes = useStyles();
  const [searchGig, { data, error, loading }] = useLazyQuery(GET_ONE_GIG, {
    variables: { idOrSlug: params.idOrSlug },
  });

  useEffect(() => {
    if (params.idOrSlug) {
      searchGig();
    }
  }, [params, searchGig]);

  if (data && data.oneGig) {
    gig = data.oneGig;
  }

  if (!params.idOrSlug || !gig) {
    return <Fragment></Fragment>;
  }

  return (
    <Grid container alignItems="flex-start" spacing={2}>
      <Grid item xs={12} sm={4} md={4} lg={3}>
        <Box className="service__map">
          <StaticMap gig={gig} size={[500, 400]} zoom={16} withLink={true} withAddress={true} />
        </Box>
      </Grid>
      <Grid item xs={12} sm={8} md={8} lg={9}>
        <Box mb={2}>
          <Carousel images={gig.images} width={600} height={100}></Carousel>
        </Box>

        <Paper className="service__container">
          <Typography variant="h5">{gig.title}</Typography>
          <div className="service-avatar">
            <img className="service-avatar__image" src={gig._providerAvatar} alt="" />
            <div className="service-avatar__details">
              <Typography variant="h6" className="service-avatar__name">
                {gig._providerName}
              </Typography>
              <StarRating score={gig._rating} readOnly="true" size="small" />
            </div>
          </div>
          {gig.description}
          <div className={clsx('service-price', classes['servicePrice'])}>{gig.price}€/h</div>
        </Paper>
        <Box m={2}>
          {Array.apply(null, Array(4)).map((el, idx) => (
            <Box mb={2} key={idx}>
              <StarRating
                score={Math.random() * 5}
                readOnly="true"
                color="#f7a918"
                title="Anonymous User"
                comment="Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio ea laudantium at! Officia aliquam sunt nulla? Eum totam velit ipsa molestias. Nihil aliquid temporibus voluptates eligendi ratione, nam corporis illum!"
              />
            </Box>
          ))}
        </Box>
        <Box mt={2}>
          <Button variant="contained" color="secondary" className={classes['servicePrice']}>
            Contact
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

const Layout = WithHeaderLayout;

Service.getInitialProps = async ({ query: { id } }, res) => {
  return { params: { idOrSlug: id } };
};

Service.Layout = Layout;

export default withApollo(Service);
