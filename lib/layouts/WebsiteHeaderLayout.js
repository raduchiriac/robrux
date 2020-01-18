import React, { Fragment } from 'react';
import Container from '@material-ui/core/Container';
import HeaderWebsiteContainer from '~/components/HeaderWebsiteContainer';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: 80,
  },
}));

export const WebsiteHeaderLayout = ({ children }) => {
  const classes = useStyles();

  return (
    <Fragment>
      <HeaderWebsiteContainer />
      <Container maxWidth="lg" className={classes.container}>
        {children}
      </Container>
    </Fragment>
  );
};
