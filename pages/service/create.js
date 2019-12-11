import React from 'react';
import GigCreateContainer from '~/components/GigCreateContainer';

import { AccountLayout } from '~/lib/layouts/AccountLayout';
import withApollo from '~/lib/hocs/withApollo';

const ServiceCreate = ({ params }) => {
  return <GigCreateContainer />;
};

ServiceCreate.Layout = AccountLayout;

export default withApollo(ServiceCreate);
