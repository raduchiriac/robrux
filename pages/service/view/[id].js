import React, { useContext, Fragment } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import FlagOutlinedIcon from '@material-ui/icons/FlagOutlined';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import HelpTwoToneIcon from '@material-ui/icons/HelpTwoTone';
import Divider from '@material-ui/core/Divider';
import Error from '~/pages/_error';
import { TranslationsContext } from '~/lib/contexts/TranslationsContext';
import { GET_ONE_GIG } from '~/lib/graphql/gigs.strings';
import StaticMap from '~/components/Map/StaticMap';
import StarRating from '~/components/Rating/StarRating';
import MaterialCarousel from '~/components/Carousel/MaterialCarousel';
import parse from 'html-react-parser';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { WebsiteHeaderLayout } from '~/lib/layouts/WebsiteHeaderLayout';
import withApollo from '~/lib/hocs/withApollo';

const useStyles = makeStyles((theme, mobileMapHeight = 150) => ({
  container: {
    padding: theme.spacing(1, 2, 0),
    overflow: 'hidden',
    position: 'relative',
  },
  staticMap: {
    overflow: 'hidden',
    '& img[data-value="map"]': {
      borderRadius: theme.shape.borderRadius,
      boxShadow: theme.shadows[1],
    },
    [theme.breakpoints.down('xs')]: {
      height: mobileMapHeight,
      borderRadius: theme.shape.borderRadius,
      boxShadow: theme.shadows[1],
      '& [data-value="root"]': {
        transform: `translateY(calc(-50% + ${mobileMapHeight / 2}px))`,
      },
      '& [data-value="address"]': {
        display: 'none',
        visibility: 'hidden',
      },
    },
  },
  title: {
    marginTop: theme.spacing(1),
  },
  avatar: {
    display: 'flex',
    margin: theme.spacing(1, 0),
  },
  avatarImage: {
    width: 64,
    height: 64,
    marginRight: theme.spacing(1),
    borderRadius: '50%',
  },
  flag: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(2),
  },
  servicePriceGrid: {
    display: 'flex',
    alignItems: 'stretch',
    margin: theme.spacing(0, -2),
  },
  servicePrice: {
    flex: 1,
    textAlign: 'center',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(1),
    cursor: 'pointer',
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.15em',
    },
  },
  servicePriceRange: { backgroundColor: fade(theme.palette.primary.dark, 0.7) },
  serviceActions: {
    display: 'flex',
    '& button': {
      flex: 1,
      margin: 0,
    },
  },
  tags: {
    margin: theme.spacing(1, 0),
    '& > *': {
      margin: `0 ${theme.spacing(0.5)}px`,
    },
  },
  'service-description': {
    marginBottom: theme.spacing(2),
  },
  tag: {
    marginBottom: theme.spacing(1),
    '&:first-child': {
      marginLeft: 0,
    },
  },
  divider: {
    marginTop: theme.spacing(2),
  },
  categories: {
    marginRight: theme.spacing(3),
    '& > *': {
      margin: `0 ${theme.spacing(0.5)}px`,
    },
  },
  category: {
    marginTop: theme.spacing(1),
    '&:first-child': {
      marginLeft: 0,
    },
  },
}));

const ServiceView = props => {
  const { gig, statusCode } = props;
  const classes = useStyles();
  const { STRINGS } = useContext(TranslationsContext).state;
  if (!gig) return <Error statusCode={statusCode} />;

  return (
    <Grid container alignItems="flex-start" spacing={2}>
      <Grid item xs={12} sm={4} md={4} lg={3}>
        <Box className={classes.staticMap}>
          <StaticMap gig={gig} size={[600, 400]} zoom={16} withLink={true} withAddress={true} />
        </Box>
      </Grid>
      <Grid item xs={12} sm={8} md={8} lg={9}>
        <Paper className={classes.container}>
          <IconButton size="small" className={classes.flag} color="primary" aria-label="">
            {/* TODO: Dialog to confirm */}
            <FlagOutlinedIcon fontSize="inherit" />
          </IconButton>
          {!!gig.categories.length && (
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
          )}
          <Typography variant="h5" className={classes.title}>
            {gig.title}
          </Typography>
          <div className={classes.avatar}>
            <img className={classes.avatarImage} src={gig._providerAvatar} alt="" />
            <div className={classes.avatarDetails}>
              <Typography variant="subtitle1" className="service-avatar__name">
                {gig._providerName}
              </Typography>
              <StarRating score={gig._rating} readOnly={true} size="small" />
            </div>
          </div>
          <div className={classes['service-description']}>{gig.richDescription && parse(gig.richDescription)}</div>
          {!!gig.tags.length && (
            <Fragment>
              <Divider className={classes.divider} />
              <div className={classes.tags}>
                {gig.tags.map((tag, idx) => (
                  <Chip className={classes.tag} key={`${idx}tag`} size="small" label={tag} />
                ))}
              </div>
            </Fragment>
          )}

          <div className={classes.servicePriceGrid}>
            {!!gig.price && (
              <Tooltip enterTouchDelay={300} arrow title="_PRICE_PER_HOUR_EXPLAIN" placement="top">
                <div className={classes.servicePrice}>
                  <Box mr={1} component="span">{`${gig.price}${STRINGS.CURRENCY_TIME_PRICE_ENDING}`}</Box>
                  <HelpTwoToneIcon fontSize="small" />
                </div>
              </Tooltip>
            )}
            {!!gig.priceRange.length && (
              <Tooltip enterTouchDelay={300} arrow title="_PRICE_RANGE_EXPLAIN" placement="top">
                <div className={clsx(classes.servicePrice, classes.servicePriceRange)}>
                  <Box mr={1} component="span">{`${gig.priceRange.join('€ – ')}€`}</Box>
                  <HelpTwoToneIcon fontSize="small" />
                </div>
              </Tooltip>
            )}
          </div>
        </Paper>
        <Box mt={2}>
          <MaterialCarousel images={gig.images} height={200}></MaterialCarousel>
        </Box>
        {true && (
          // TODO: If there are reviews
          <Box>
            {Array.apply(null, Array(4)).map((el, idx) => (
              <Box mb={2} key={idx}>
                <StarRating
                  score={Math.random() * 5}
                  readOnly={true}
                  color="#f7a918"
                  title="Anonymous User"
                  comment="Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio ea laudantium at! Officia aliquam sunt nulla? Eum totam velit ipsa molestias. Nihil aliquid temporibus voluptates eligendi ratione, nam corporis illum!"
                />
              </Box>
            ))}
          </Box>
        )}
        <Box mt={2} className={classes.serviceActions}>
          <Button variant="contained" color="primary">
            {STRINGS.SERVICE_CONTACT}
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

ServiceView.getInitialProps = async ctx => {
  const { query, apolloClient, res } = ctx;
  const result = await apolloClient.query({ query: GET_ONE_GIG, variables: { idOrSlug: query.id } });
  if (!result.data.oneGig) res.statusCode = 404;

  return { gig: result.data.oneGig, statusCode: res.statusCode };
};

ServiceView.Layout = WebsiteHeaderLayout;

export default withApollo(ServiceView);
