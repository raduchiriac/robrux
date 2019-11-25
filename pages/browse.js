import React from 'react';
import { useRouter } from 'next/router';

import { WithHeaderLayout } from '~/lib/layouts/WithHeaderLayout';
import BrowsePageContainer from '~/components/BrowsePageContainer';
import withApollo from '~/lib/hocs/withApollo';

const Browse = props => {
  const router = useRouter();

  return <BrowsePageContainer searchingFor={router.query.search || ''} inLocation={router.query.location || ''} />;
};

Browse.Layout = WithHeaderLayout;

export default withApollo(Browse);
