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
  const { gig, hovered, classes, loading } = props;
  return (
    <Paper
      className={clsx(
        'small-gig__container',
        classes['small-gig__container'],
        hovered && 'small-gig__container--hover',
        loading && 'small-gig__container--loading'
      )}
      // onMouseEnter={() => this._onPaperEnter(gig)}
      // onMouseLeave={() => this._onPaperLeave()}
      // onClick={() => {
      //   this.setState(
      //     {
      //       gigs: this.state.gigs.filter(g => g._id === gig._id),
      //       product: true,
      //       autoRefresh: false,
      //     },
      //     () => {
      //       // Get bounds by our gigs
      //       const bounds = getMapBounds(this.state.map, this.state.maps, this.state.gigs);
      //       // Fit map to bounds
      //       this.state.map.fitBounds(bounds);
      //     }
      //   );
      // }}
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
