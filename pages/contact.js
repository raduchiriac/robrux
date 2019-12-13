import React from 'react';
import withApollo from '~/lib/hocs/withApollo';
import { WebsiteHeaderLayout } from '~/lib/layouts/WebsiteHeaderLayout';

const Contact = () => {
  return <div>Contact</div>;
};

Contact.Layout = WebsiteHeaderLayout;
export default withApollo(Contact);
