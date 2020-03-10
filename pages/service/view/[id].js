import React, { useContext, useState, useRef, Fragment } from 'react';
import clsx from 'clsx';
import { Helmet } from 'react-helmet';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Popover from '@material-ui/core/Popover';
import FlagTwoToneIcon from '@material-ui/icons/FlagTwoTone';
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
import Link from '~/lib/hocs/withLink';
import DialogHeight from '~/components/FormElements/DialogHeight';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { WebsiteHeaderLayout } from '~/lib/layouts/WebsiteHeaderLayout';
import withApollo from '~/lib/hocs/withApollo';
import TextField from '@material-ui/core/TextField';

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
    top: theme.spacing(1),
  },
  report: {
    textTransform: 'none',
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
  'service-avatar__name': {
    color: theme.palette.grey[800],
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
  messageTextField: {
    width: '80%',
  },
}));

const ContactForm = ({ placeholder, buttonText }) => {
  const inputRef = useRef(null);
  const handleTextSubmit = () => {
    const message = inputRef.current.value;
    if (message.trim()) {
      console.log('SEND');
    }
  };
  return (
    <Box>
      <TextField
        fullWidth
        margin="normal"
        autoFocus
        size="small"
        id="message"
        inputRef={inputRef}
        label={placeholder}
        multiline
        required
        rows="5"
        defaultValue=""
        variant="outlined"
      />
      <Button fullWidth variant="contained" color="primary" onClick={evt => handleTextSubmit()}>
        {buttonText}
      </Button>
    </Box>
  );
};

const ServiceView = ({ gig, statusCode }) => {
  const classes = useStyles();
  const { STRINGS } = useContext(TranslationsContext).state;
  const [anchorElFlag, setAnchorElFlag] = useState(null);
  const [openContactFormModal, setOpenContactFormModal] = useState(false);
  const openFlag = Boolean(anchorElFlag);

  const handleClickFlag = event => {
    setAnchorElFlag(event.currentTarget);
  };
  const handleCloseFlag = () => {
    setAnchorElFlag(null);
  };
  if (!gig) return <Error statusCode={statusCode} />;

  const handleContactFormModal = evt => {
    setOpenContactFormModal(true);
  };

  const handleCloseContactFormModal = evt => {
    setOpenContactFormModal(false);
  };

  return (
    <Grid container alignItems="flex-start" spacing={2}>
      <Helmet title={gig.title} />
      <Grid item xs={12} sm={4} md={4} lg={3}>
        <Box className={classes.staticMap}>
          <StaticMap gig={gig} size={[600, 400]} zoom={16} withLink={true} withAddress={true} />
        </Box>
      </Grid>
      <Grid item xs={12} sm={8} md={8} lg={9}>
        <Paper className={classes.container}>
          <IconButton
            className={classes.flag}
            color="primary"
            onClick={handleClickFlag}
            aria-label={STRINGS.SERVICE_REPORT}
          >
            <FlagTwoToneIcon fontSize="inherit" />
          </IconButton>
          <Popover
            open={openFlag}
            anchorEl={anchorElFlag}
            onClose={handleCloseFlag}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <Box p={1}>
              <Button className={classes.report} color="primary" size="small">
                {STRINGS.SERVICE_REPORT}
              </Button>
            </Box>
          </Popover>
          {!!gig.categories.length && (
            <div className={classes.categories}>
              {gig.categories.map((category, idx) => (
                <Chip
                  className={classes.category}
                  key={`${idx}category`}
                  clickable
                  component="a"
                  variant="outlined"
                  href={`/browse?category=${category}`}
                  label={STRINGS.SERVICE_NEW_CATEGORIES[category]}
                />
              ))}
            </div>
          )}
          <Typography variant="h5" className={classes.title}>
            {gig.title}
          </Typography>
          <Link className={classes.avatar} href={`/profile/view/${gig._userId._id}`} underline="none">
            <img
              className={classes.avatarImage}
              src={gig._userId.avatar}
              alt={`${gig._userId.firstName} ${gig._userId.lastName}`}
            />
            <div className={classes.avatarDetails}>
              <Typography variant="subtitle1" className={classes['service-avatar__name']}>
                {`${gig._userId.firstName} ${gig._userId.lastName}`}
              </Typography>
              <StarRating score={gig._rating} readOnly={true} size="small" />
            </div>
          </Link>
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
        <Container maxWidth="sm">
          <Box mt={2}>
            <MaterialCarousel images={gig.images} height={200}></MaterialCarousel>
          </Box>
          {true && (
            // TODO: Check above if there are reviews
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
            // TODO: Load more reviews button
          )}
        </Container>
        <DialogHeight
          id="contactForm"
          open={openContactFormModal}
          handleClose={evt => handleCloseContactFormModal(evt)}
          title={`${STRINGS.SERVICE_MESSAGE_FOR} ${gig._userId.firstName}`}
          buttonText={STRINGS.CLOSE}
        >
          <ContactForm placeholder={STRINGS.SERVICE_MESSAGE_TEXT} buttonText={STRINGS.SEND} />
        </DialogHeight>
        <Box mt={2} mb={2} className={classes.serviceActions}>
          <Button variant="contained" color="primary" onClick={evt => handleContactFormModal()}>
            {STRINGS.SERVICE_CONTACT}
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

ServiceView.getInitialProps = async ctx => {
  const { query, apolloClient, res = {} } = ctx;
  const result = await apolloClient.query({
    query: GET_ONE_GIG,
    variables: { idOrSlug: encodeURIComponent(query.id) },
  });
  let statusCode = (res && res.statusCode) || 200;
  if (!result.data.oneGig) statusCode = 404;

  return { gig: result.data.oneGig, statusCode };
};

ServiceView.Layout = WebsiteHeaderLayout;

export default withApollo(ServiceView);
