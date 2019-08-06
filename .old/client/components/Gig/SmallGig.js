import React, { Fragment } from 'react';
import clsx from 'clsx';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

import style from './SmallGig.styles.scss';

const styles = theme => ({
  'small-gig__container': {
    padding: theme.spacing(2),
    color: theme.custom_palette.alternateColor,
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
    background: theme.custom_palette.alternateColor,
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
    borderRadius: `0 0 ${theme.shape.borderRadius}px 0`,
  },
});

const SmallGig = props => {
  const { gig, hovered, classes, loading, _onMouseEnter, _onMouseLeave, _onClick } = props;
  return (
    <Paper
      className={clsx(
        'small-gig__container',
        classes['small-gig__container'],
        hovered && 'small-gig__container--hover',
        loading && 'small-gig__container--loading'
      )}
      onMouseEnter={() => _onMouseEnter(gig._id, gig)}
      onMouseLeave={() => _onMouseLeave()}
      onClick={() => _onClick(gig)}
    >
      <div className={clsx('small-gig__avatar-container', classes['small-gig__avatar-container'])}>
        {gig ? (
          <img className={'small-gig__avatar'} src={gig.images[0]} alt={gig._providerName} />
        ) : (
          <div className="small-gig__avatar"></div>
        )}
      </div>
      <div className={'small-gig__details-container'}>
        <p className={'small-gig__title'}>{(gig && gig.title) || ''}</p>
        <p className={'small-gig__provider'}>{(gig && gig._providerName) || ''}</p>
        {gig && (
          <Fragment>
            <p className={clsx('small-gig__rating', classes['small-gig__rating'])}>
              ★ {Math.round(gig._rating * 100) / 100}
            </p>
            <div className={clsx('small-gig__price', classes['small-gig__price'])}>{gig.price}€/h</div>
          </Fragment>
        )}
      </div>
    </Paper>
  );
};

export default withStyles(styles)(SmallGig);
