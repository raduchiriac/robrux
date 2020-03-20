import React from 'react';
import withApollo from '~/lib/hocs/withApollo';
import { WebsiteHeaderAndFooterLayout } from '~/lib/layouts/WebsiteHeaderAndFooterLayout';
import Container from '@material-ui/core/Container';

const Contact = () => {
  return <Container>Contact</Container>;
};

Contact.Layout = WebsiteHeaderAndFooterLayout;
export default withApollo(Contact);
