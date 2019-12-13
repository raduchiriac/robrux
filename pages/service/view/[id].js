import React from 'react';
import GigViewContainer from '~/components/GigViewContainer';
import { useRouter } from 'next/router';

import { WebsiteHeaderLayout } from '~/lib/layouts/WebsiteHeaderLayout';
import withApollo from '~/lib/hocs/withApollo';

const ServiceView = ({ params }) => {
  const router = useRouter();

  return <GigViewContainer idOrSlug={router.query.id || ''} />;
};

ServiceView.Layout = WebsiteHeaderLayout;

export default withApollo(ServiceView);
