import React, { useState, useEffect, useContext, Fragment } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { useLazyQuery } from '@apollo/react-hooks';
import { LanguagesContext } from '~/lib/contexts/LanguagesContext';
import { GET_ONE_GIG } from '~/lib/graphql/gigs.strings';
import StaticMap from '~/components/Map/StaticMap';
import StarRating from '~/components/Rating/StarRating';
import MaterialCarousel from '~/components/Carousel/MaterialCarousel';
import parse from 'html-react-parser';
import Error from 'next/error';

import './GigViewContainer.scss';

const useStyles = makeStyles(theme => ({
  button: {
    backgroundColor: theme.custom_palette && theme.custom_palette.alternateColor,
  },
  servicePrice: {
    textAlign: 'center',
    background: theme.custom_palette && theme.custom_palette.alternateColor,
  },
  tags: {
    marginTop: theme.spacing(1),
    '& > *': {
      margin: `0 ${theme.spacing(0.5)}px`,
    },
  },
  divider: {
    marginTop: theme.spacing(2),
  },
  tag: {
    '&:first-child': {
      marginLeft: 0,
    },
  },
  categories: {
    marginBottom: theme.spacing(1),
    '& > *': {
      margin: `0 ${theme.spacing(0.5)}px`,
    },
  },
  category: {
    '&:first-child': {
      marginLeft: 0,
    },
  },
}));

const GigViewContainer = props => {
  let gig = false;
  const classes = useStyles();
  const [searchGig, { data, error, loading }] = useLazyQuery(GET_ONE_GIG, {
    variables: { idOrSlug: props.idOrSlug },
  });
  const { STRINGS } = useContext(LanguagesContext).state;

  useEffect(() => {
    if (props.idOrSlug) {
      searchGig();
    }
  }, [props.idOrSlug, searchGig]);

  if (data && data.oneGig) {
    gig = data.oneGig;
  }

  if (!props.idOrSlug || !gig) {
    return <Fragment></Fragment>;
  }

  return (
    <Grid container alignItems="flex-start" spacing={2}>
      <Grid item xs={12} sm={4} md={4} lg={3}>
        <Box className="service__map">
          <StaticMap gig={gig} size={[600, 400]} zoom={16} withLink={true} withAddress={true} />
        </Box>
      </Grid>
      <Grid item xs={12} sm={8} md={8} lg={9}>
        <Paper className="service__container">
          <div className={classes.categories}>
            {gig.categories.map((category, idx) => (
              <Chip
                className={classes.category}
                key={`${idx}category`}
                clickable
                variant="outlined"
                onClick={evt => {
                  // (`Router.push: ${category}`);
                }}
                label={STRINGS.SERVICE_NEW_CATEGORIES[category]}
              />
            ))}
          </div>
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
          <div className="service-description">{gig.richDescription && parse(gig.richDescription)}</div>
          <Divider className={classes.divider} />
          <div className={classes.tags}>
            {`${STRINGS.SERVICE_NEW_TAGS}: `}
            {gig.tags.map((tag, idx) => (
              <Chip className={classes.tag} key={`${idx}tag`} size="small" label={tag} />
            ))}
          </div>
          <div className={clsx('service-price', classes['servicePrice'])}>
            {`${gig.price}${STRINGS.CURRENCY_TIME_PRICE_ENDING}`}
          </div>
        </Paper>
        <Box mt={2}>
          <MaterialCarousel images={gig.images} height={200}></MaterialCarousel>
        </Box>
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
        <Box mt={2} className="service-actions">
          <Button variant="contained" color="primary" className={classes['servicePrice']}>
            Contact
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default GigViewContainer;
