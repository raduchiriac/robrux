import React, { Fragment } from 'react';
import Container from '@material-ui/core/Container';
import HeaderWebsiteContainer from '~/components/HeaderWebsiteContainer';

export const WithHeaderLayout = ({ children }) => {
  return (
    <Fragment>
      <HeaderWebsiteContainer />
      <Container maxWidth="lg" style={{ marginTop: 80 }}>
        {children}
      </Container>
    </Fragment>
  );
};
