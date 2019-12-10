import React from 'react';
import GigCreateContainer from '~/components/GigCreateContainer';

import { WithHeaderLayout } from '~/lib/layouts/WithHeaderLayout';
import withApollo from '~/lib/hocs/withApollo';

const ServiceCreate = ({ params }) => {
  return <GigCreateContainer />;
};

ServiceCreate.Layout = WithHeaderLayout;

export default withApollo(ServiceCreate);
