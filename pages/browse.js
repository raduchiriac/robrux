import React from 'react';

import { WithHeaderLayout } from '../lib/layouts/WithHeaderLayout';
import IndexPageContainer from '../components/IndexPageContainer';
import withApollo from '../lib/hocs/withApollo';

const Browse = props => {
  return <IndexPageContainer />;
};

Browse.Layout = WithHeaderLayout;

export default withApollo(Browse);
