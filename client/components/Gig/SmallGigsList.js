import React, { Fragment } from 'react';
import SmallGig from './SmallGig';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  'small-gigs-list__container': {
    flex: 1,
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
  },
});

const SmallGigsList = props => {
  const { classes, loading, gigs, hovered, _onMouseEnter, _onMouseLeave, _onClick } = props;
  return (
    <Grid container spacing={2} className={classes['small-gigs-list__container']}>
      {((gigs.length && gigs) || [false, false, false]).map((gig, index) => {
        return (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <SmallGig
              hovered={hovered === gig._id}
              gig={gig}
              loading={loading}
              _onMouseEnter={_onMouseEnter}
              _onMouseLeave={_onMouseLeave}
              _onClick={_onClick}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default withStyles(styles)(SmallGigsList);
