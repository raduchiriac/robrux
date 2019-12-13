import React from 'react';
import withApollo from '~/lib/hocs/withApollo';
import { WebsiteHeaderLayout } from '~/lib/layouts/WebsiteHeaderLayout';

const Terms = () => {
  return <div>Terms and conditions</div>;
};

Terms.Layout = WebsiteHeaderLayout;
export default withApollo(Terms);
