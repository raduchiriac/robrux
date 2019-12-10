import React from 'react';
import GigCreateContainer from '~/components/GigCreateContainer';

import { UserLayout } from '~/lib/layouts/UserLayout';
import withApollo from '~/lib/hocs/withApollo';

const ServiceCreate = ({ params }) => {
  return <GigCreateContainer />;
};

ServiceCreate.Layout = UserLayout;

export default withApollo(ServiceCreate);
