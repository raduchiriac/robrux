import React, { Fragment, useContext } from 'react';
import clsx from 'clsx';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { TranslationsContext } from '~/lib/contexts/TranslationsContext';
import Link from '~/lib/hocs/withLink';
import ConditionalWrap from '~/lib/hocs/ConditionalWrap';
import 'react-lazy-load-image-component/src/effects/blur.css';

import './SmallGig.css';

const styles = theme => ({
  'small-gig__container': {
    position: 'relative',
    display: 'flex',
    height: 140,
    padding: theme.spacing(2),
    transition: theme.transitions.create(),
    color: theme.custom_palette && theme.custom_palette.alternateColor,
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
  'small-gig__link': {
    display: 'flex',
  },
  'small-gig__details-container': { flex: 1 },
  'small-gig__title': {
    fontWeight: 'bold',
  },
  'small-gig__title--loading': {
    height: 24,
    borderRadius: 16,
  },
  'x--loading': {
    background: 'repeating-linear-gradient(to right, #ccc 0%, #eee 50%, #ccc 100%)',
    width: '100%',
    backgroundSize: '200% auto',
    backgroundPosition: '0 100%',
    animation: 'gradient 1s infinite',
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
    color: '#db8555',
    fontWeight: 'bold',
    bottom: 0,
    backgroundColor: '#ffe',
    position: 'absolute',
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
    color: 'white',
    background: theme.custom_palette && theme.custom_palette.alternateColor,
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
    borderRadius: `0 0 ${theme.shape.borderRadius}px 0`,
  },
});

const SmallGig = props => {
  const { scrollPosition, gig, hovered, classes, loading, _onMouseEnter = () => {}, _onMouseLeave = () => {} } = props;
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
            <div className={clsx(classes['small-gig__avatar'], loading && classes['x--loading'])}></div>
          )}
        </div>
        <div className={classes['small-gig__details-container']}>
          <p
            className={clsx(
              classes['small-gig__title'],
              loading && [classes['x--loading'], classes['small-gig__title--loading']]
            )}
          >
            {(!loading && gig && gig.title) || ''}
          </p>
          <p
            className={clsx(
              classes['small-gig__provider'],
              loading && [classes['x--loading'], classes['small-gig__provider--loading']]
            )}
          >
            {(!loading && gig && gig._providerName) || ''}
          </p>
          {!loading && gig && (
            <Fragment>
              <p className={classes['small-gig__rating']}>★ {gig._rating.toFixed(2)}</p>
              <div className={classes['small-gig__price']}>{`${gig.price}${STRINGS.CURRENCY_TIME_PRICE_ENDING}`}</div>
            </Fragment>
          )}
        </div>
      </Paper>
    </ConditionalWrap>
  );
};

export default withStyles(styles)(SmallGig);
