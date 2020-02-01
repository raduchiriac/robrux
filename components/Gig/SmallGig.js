import React, { Fragment, useContext } from 'react';
import clsx from 'clsx';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { TranslationsContext } from '~/lib/contexts/TranslationsContext';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Link from '~/lib/hocs/withLink';
import ConditionalWrap from '~/lib/hocs/withConditionalWrap';

import CSS from './SmallGig.module.css';

const styles = theme => ({
  'small-gig__container': {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: 140,
    flex: 1,
    padding: theme.spacing(2),
    transition: theme.transitions.create(),
    color: theme.palette.primary.dark,
    boxShadow: theme.shadows[1],
    backgroundColor: theme.palette.grey[200],
  },
  'small-gig__container--hover': {
    backgroundColor: theme.palette.grey[300],
  },
  'small-gig__avatar-container': {
    marginRight: theme.spacing(1),
    width: 64,
    height: 64,
    flexGrow: 0,
    flexShrink: 0,
  },
  'small-gig__avatar': {
    borderRadius: '50%',
    width: 64,
    height: 64,
  },
  'small-gig__avatar--loading': {
    backgroundColor: theme.palette.grey[500],
  },
  'small-gig__link': {
    display: 'flex',
  },
  'small-gig__details-container': { flex: 1, overflow: 'hidden' },
  'small-gig__title': {
    fontWeight: 'bold',
    lineHeight: 1.23,
  },
  'small-gig__title--loading': {
    height: 24,
    borderRadius: 16,
  },
  'x--loading': {
    background: `repeating-linear-gradient(to right, ${theme.palette.grey[400]} 0%, ${theme.palette.grey[100]} 50%, ${theme.palette.grey[400]} 100%)`,
    width: '100%',
    backgroundSize: '200% auto',
    backgroundPosition: '0 100%',
    animation: 'gradient 0.6s infinite',
    animationFillMode: 'forwards',
    animationTimingFunction: 'linear',
  },
  'small-gig__provider': {
    color: theme.palette.grey[600],
  },
  'small-gig__provider--loading': {
    marginTop: theme.spacing(2),
    height: 16,
    borderRadius: 8,
  },
  'small-gig__rating': {
    color: theme.custom_palette.warning,
    fontWeight: 'bold',
    bottom: 0,
    backgroundColor: theme.custom_palette.pale,
    position: 'absolute',
    height: 37,
    left: 0,
    right: 0,
    textIndent: 10,
    padding: theme.spacing(1),
    borderRadius: `0 0 ${theme.shape.borderRadius}px ${theme.shape.borderRadius}px`,
  },
  'small-gig__price': {
    position: 'absolute',
    bottom: 0,
    right: 0,
    fontSize: 'inherit',
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.light,
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
    borderRadius: `0 0 ${theme.shape.borderRadius}px 0`,
    height: 37,
    lineHeight: 1.5,
  },
  'small-gig__pricerange': {
    fontSize: '0.8em',
    lineHeight: 2,
    color: theme.palette.primary.contrastText,
    backgroundColor: fade(theme.palette.primary.dark, 0.7),
  },
});

const SmallGig = ({
  scrollPosition,
  gig,
  hovered,
  classes,
  loading,
  _onMouseEnter = () => {},
  _onMouseLeave = () => {},
}) => {
  const { STRINGS } = useContext(TranslationsContext).state;

  return (
    <ConditionalWrap
      condition={!loading}
      wrap={children => (
        <Link className={classes['small-gig__link']} href={`/service/view/${gig.slug || gig._id}`} underline="none">
          {children}
        </Link>
      )}
    >
      <Paper
        className={clsx(classes['small-gig__container'], hovered && classes['small-gig__container--hover'])}
        onMouseEnter={() => (loading ? null : _onMouseEnter(gig._id, gig))}
        onMouseLeave={() => _onMouseLeave()}
      >
        <div className={classes['small-gig__avatar-container']}>
          {!loading && gig ? (
            <LazyLoadImage
              effect="blur"
              scrollPosition={scrollPosition}
              className={clsx(classes['small-gig__avatar'])}
              src={gig._providerAvatar}
              alt={gig._providerName}
            />
          ) : (
            <div className={clsx(classes['small-gig__avatar'], loading && classes['small-gig__avatar--loading'])}></div>
          )}
        </div>
        <div className={classes['small-gig__details-container']}>
          <Typography
            component="p"
            variant="body2"
            className={clsx(
              classes['small-gig__title'],
              loading && [classes['x--loading'], classes['small-gig__title--loading']]
            )}
          >
            {(!loading && gig && gig.title) || ''}
          </Typography>
          <Typography
            variant="subtitle2"
            component="p"
            className={clsx(
              classes['small-gig__provider'],
              loading && [classes['x--loading'], classes['small-gig__provider--loading']]
            )}
          >
            {(!loading && gig && gig._providerName) || ''}
          </Typography>
          {!loading && gig && (
            <Fragment>
              {
                <Typography component="p" variant="subtitle2" className={classes['small-gig__rating']}>
                  {(!!gig._rating && `★ ${gig._rating.toFixed(2)}`) || ''}
                </Typography>
              }
              {(!!gig.price && (
                <Typography
                  component="div"
                  variant="caption"
                  className={classes['small-gig__price']}
                >{`${gig.price}${STRINGS.CURRENCY_TIME_PRICE_ENDING}`}</Typography>
              )) || (
                <Typography
                  component="div"
                  variant="caption"
                  className={clsx(classes['small-gig__price'], classes['small-gig__pricerange'])}
                >{`${gig.priceRange.join('€ – ')}€`}</Typography>
              )}
            </Fragment>
          )}
        </div>
      </Paper>
    </ConditionalWrap>
  );
};

export default withStyles(styles)(SmallGig);
