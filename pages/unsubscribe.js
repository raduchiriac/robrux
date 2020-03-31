import React from 'react';
import withApollo from '~/lib/hocs/withApollo';
import Container from '@material-ui/core/Container';

const Unsubscribe = () => {
  return <Container>Unsubscribe from emails</Container>;
};

export default withApollo(Unsubscribe);
