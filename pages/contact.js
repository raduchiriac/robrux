import React from 'react';
import withApollo from '~/lib/hocs/withApollo';
import { WebsiteHeaderFooterLayout } from '~/lib/layouts/WebsiteHeaderFooterLayout';
import Container from '@material-ui/core/Container';

const Contact = () => {
  return <Container>Contact</Container>;
};

Contact.Layout = WebsiteHeaderFooterLayout;
export default withApollo(Contact);
