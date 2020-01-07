import React, { Fragment, useContext } from 'react';
import clsx from 'clsx';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { TranslationsContext } from '~/lib/contexts/TranslationsContext';
import Link from '~/lib/hocs/withLink';
import ConditionalWrap from '~/lib/hocs/ConditionalWrap';
import 'react-lazy-load-image-component/src/effects/blur.css';

import './SmallGig.scss';

const styles = theme => ({
  'small-gig__container': {
    position: 'relative',
    display: 'flex',
    height: 140,
    padding: theme.spacing(2),
    transition: 'all 0.3s ease',
    color: theme.custom_palette && theme.custom_palette.alternateColor,
    boxShadow: theme.shadows[1],
    backgroundColor: theme.palette.grey[200],
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
  },
  'small-gig__link': {
    display: 'flex',
  },
  'small-gig__title': {
    fontWeight: 'bold',
  },
  'small-gig__provider': {
    color: theme.palette.grey[500],
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
        className={clsx(
          'small-gig__container',
          classes['small-gig__container'],
          hovered && 'small-gig__container--hover',
          loading && 'small-gig__container--loading'
        )}
        onMouseEnter={() => (loading ? null : _onMouseEnter(gig._id, gig))}
        onMouseLeave={() => _onMouseLeave()}
      >
        <div className={classes['small-gig__avatar-container']}>
          {!loading && gig ? (
            <LazyLoadImage
              effect="blur"
              scrollPosition={scrollPosition}
              className={classes['small-gig__avatar']}
              src={gig._providerAvatar}
              alt={gig._providerName}
            />
          ) : (
            <div className={classes['small-gig__avatar']}></div>
          )}
        </div>
        <div className={classes['small-gig__details-container']}>
          <p className={classes['small-gig__title']}>{(!loading && gig && gig.title) || ''}</p>
          <p className={classes['small-gig__provider']}>{(!loading && gig && gig._providerName) || ''}</p>
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
