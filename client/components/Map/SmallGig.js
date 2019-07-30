import React from 'react';
import Paper from '@material-ui/core/Paper';
import clsx from 'clsx';

import style from './SmallGig.styles.scss';

const SmallGig = props => {
  const { gig, classes } = props;
  return (
    <Paper
      className={clsx('small-gig__container', classes.pro)}
      // style={this.state.hoveredIndex === index ? hover : {}}
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
      <div className={classes.avatar}>
        <img className={classes.avatarImg} src={gig.images[0]} alt={gig._providerName} />
      </div>
      <div className={classes.details}>
        <p className={classes.title}>{gig.title}</p>
        <p className={classes.name}>{gig._providerName}</p>
        <p className={classes.rating}>★ {Math.round(gig._rating * 100) / 100}</p>
        <div className={classes.price}>{gig.price}€/h</div>
      </div>
    </Paper>
  );
};

export default SmallGig;
