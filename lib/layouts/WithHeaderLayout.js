import React, { Fragment } from 'react';
import Container from '@material-ui/core/Container';
import HeaderContainer from '~/components/HeaderContainer';

export const WithHeaderLayout = ({ children }) => {
  return (
    <Fragment>
      <HeaderContainer />
      <Container maxWidth="lg" style={{ marginTop: 80 }}>
        {children}
      </Container>
    </Fragment>
  );
};
