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
  const { classes, loading, gigs } = props;
  console.log(classes);
  return (
    <Grid container spacing={2} className={classes['small-gigs-list__container']}>
      {((gigs.length && gigs) || [false, false]).map((gig, index) => {
        return (
          <Grid item xs={6} sm={4} md={3} key={index}>
            <SmallGig hovered={false} gig={gig} loading={loading} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default withStyles(styles)(SmallGigsList);
