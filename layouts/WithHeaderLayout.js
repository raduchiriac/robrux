import React, { Fragment } from 'react';
import Container from '@material-ui/core/Container';
import Header from '../components/Header';

export const WithHeaderLayout = ({ children }) => {
  return (
    <Fragment>
      <Header />
      <Container maxWidth="lg" style={{ marginTop: 80 }}>
        {children}
      </Container>
    </Fragment>
  );
};
