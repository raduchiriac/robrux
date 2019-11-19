import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { trackWindowScroll } from 'react-lazy-load-image-component';
import SmallGig from './SmallGig';

const styles = theme => ({
  'small-gigs-list__container': {
    flex: 1,
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
  },
});

const SmallGigsList = (props, { scrollPosition }) => {
  const { classes, loading, gigs, hovered, _onMouseEnter, _onMouseLeave, _onClick } = props;
  return (
    <Grid container spacing={2} className={classes['small-gigs-list__container']}>
      {((gigs.length && gigs) || (loading ? [false] : [])).map((gig, index) => {
        return (
          <Grid item xs={12} sm={4} md={6} lg={6} xl={6} key={index}>
            <SmallGig
              scrollPosition={scrollPosition}
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

export default withStyles(styles)(trackWindowScroll(SmallGigsList));
