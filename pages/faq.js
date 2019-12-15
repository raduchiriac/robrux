import React from 'react';
import withApollo from '~/lib/hocs/withApollo';
import { WebsiteHeaderLayout } from '~/lib/layouts/WebsiteHeaderLayout';

const FAQ = () => {
  return <div>FAQ</div>;
};

FAQ.Layout = WebsiteHeaderLayout;
export default withApollo(FAQ);
