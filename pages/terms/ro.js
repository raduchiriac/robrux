import React from 'react';
import withApollo from '~/lib/hocs/withApollo';
import { WebsiteHeaderLayout } from '~/lib/layouts/WebsiteHeaderLayout';

const TermsRo = () => {
  return <div>Terms and conditions</div>;
};

TermsRo.Layout = WebsiteHeaderLayout;
export default withApollo(TermsRo);
