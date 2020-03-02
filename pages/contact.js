import React from 'react';
import withApollo from '~/lib/hocs/withApollo';
import { WebsiteHeaderLayout } from '~/lib/layouts/WebsiteHeaderLayout';
import Container from '@material-ui/core/Container';

const Contact = () => {
  return <Container>Contact</Container>;
};

Contact.Layout = WebsiteHeaderLayout;
export default withApollo(Contact);
