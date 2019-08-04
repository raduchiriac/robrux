import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Header from '../components/Header';

const WithHeaderLayout = ({ children }) => {
  return (
    <Fragment>
      <Header />
      <Container maxWidth="lg">{children}</Container>
    </Fragment>
  );
};

const WithHeaderLayoutRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={matchProps => (
        <WithHeaderLayout>
          <Component {...matchProps} />
        </WithHeaderLayout>
      )}
    />
  );
};

export default WithHeaderLayoutRoute;
