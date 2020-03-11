import React from 'react';
import withApollo from '~/lib/hocs/withApollo';
import { WebsiteHeaderFooterLayout } from '~/lib/layouts/WebsiteHeaderFooterLayout';

const RO = () => {
  return <div>FAQ-RO</div>;
};

RO.Layout = WebsiteHeaderFooterLayout;
export default withApollo(RO);
