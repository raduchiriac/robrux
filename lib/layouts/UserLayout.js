import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import HeaderUserContainer from '~/components/HeaderUserContainer';

export const UserLayout = ({ children }) => {
  return (
    <Fragment>
      <HeaderUserContainer />
      <Grid container style={{ marginTop: 80 }}>
        {children}
      </Grid>
    </Fragment>
  );
};
