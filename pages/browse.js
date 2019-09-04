import React from 'react';

import { WithHeaderLayout } from '../lib/layouts/WithHeaderLayout';
import IndexPageContainer from '../components/IndexPageContainer';
import { withProtectedRoute } from '../lib/hocs/withAuth';

const Browse = props => {
  return <IndexPageContainer />;
};

Browse.Layout = WithHeaderLayout;

export default Browse;
