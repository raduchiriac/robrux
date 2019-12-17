import React from 'react';
import withApollo from '~/lib/hocs/withApollo';
import { WebsiteHeaderLayout } from '~/lib/layouts/WebsiteHeaderLayout';

const RO = () => {
  return <div>FAQ-RO</div>;
};

RO.Layout = WebsiteHeaderLayout;
export default withApollo(RO);
