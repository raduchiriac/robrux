import React from 'react';
import GigViewContainer from '~/components/GigViewContainer';
import { useRouter } from 'next/router';

import { WithHeaderLayout } from '~/lib/layouts/WithHeaderLayout';
import withApollo from '~/lib/hocs/withApollo';

const ServiceView = ({ params }) => {
  const router = useRouter();

  return <GigViewContainer idOrSlug={router.query.id || ''} />;
};

ServiceView.Layout = WithHeaderLayout;

export default withApollo(ServiceView);
