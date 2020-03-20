import React from 'react';
import withApollo from '~/lib/hocs/withApollo';
import { WebsiteHeaderAndFooterLayout } from '~/lib/layouts/WebsiteHeaderAndFooterLayout';

const RO = () => {
  return <div>FAQ-RO</div>;
};

RO.Layout = WebsiteHeaderAndFooterLayout;
export default withApollo(RO);
