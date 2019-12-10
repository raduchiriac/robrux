import React, { Fragment, useRef, useContext } from 'react';
import clsx from 'clsx';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { LanguagesContext } from '~/lib/contexts/LanguagesContext';
import Link from '~/lib/hocs/withLink';
import ConditionalWrap from '~/lib/hocs/ConditionalWrap';
import 'react-lazy-load-image-component/src/effects/blur.css';

import './SmallGig.scss';

const styles = theme => ({
  'small-gig__container': {
    padding: theme.spacing(2),
    color: theme.custom_palette && theme.custom_palette.alternateColor,
    boxShadow: theme.shadows[1],
    backgroundColor: theme.palette.grey['200'],
  },
  'small-gig__avatar-container': {
    marginRight: theme.spacing(1),
  },
  'small-gig__rating': {
    padding: theme.spacing(1),
    borderRadius: `0 0 ${theme.shape.borderRadius}px ${theme.shape.borderRadius}px`,
  },
  'small-gig__price': {
    background: theme.custom_palette && theme.custom_palette.alternateColor,
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
    borderRadius: `0 0 ${theme.shape.borderRadius}px 0`,
  },
});

const SmallGig = props => {
  const { scrollPosition, gig, hovered, classes, loading, _onMouseEnter = () => {}, _onMouseLeave = () => {} } = props;
  // const smallGigElementRef = useRef(null);

  const { STRINGS } = useContext(LanguagesContext).state;

  return (
    <ConditionalWrap
      condition={!loading}
      wrap={children => (
        <Link className={'small-gig__link'} href={`/service/view/${gig.slug || gig._id}`} underline="none">
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
        <div className={clsx('small-gig__avatar-container', classes['small-gig__avatar-container'])}>
          {!loading && gig ? (
            <LazyLoadImage
              effect="blur"
              scrollPosition={scrollPosition}
              className={'small-gig__avatar'}
              src={gig._providerAvatar}
              alt={gig._providerName}
            />
          ) : (
            <div className="small-gig__avatar"></div>
          )}
        </div>
        <div className={'small-gig__details-container'}>
          <p className={'small-gig__title'}>{(!loading && gig && gig.title) || ''}</p>
          <p className={'small-gig__provider'}>{(!loading && gig && gig._providerName) || ''}</p>
          {!loading && gig && (
            <Fragment>
              <p className={clsx('small-gig__rating', classes['small-gig__rating'])}>★ {gig._rating.toFixed(2)}</p>
              <div className={clsx('small-gig__price', classes['small-gig__price'])}>
                {`${gig.price}${STRINGS.CURRENCY_TIME_PRICE_ENDING}`}
              </div>
            </Fragment>
          )}
        </div>
      </Paper>
    </ConditionalWrap>
  );
};

export default withStyles(styles)(SmallGig);
