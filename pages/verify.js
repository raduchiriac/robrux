import React from 'react';
import { DefaultLayout } from '../layouts/DefaultLayout';
import { withProtectedRoute } from '../lib/hocs/withAuth';

const Verify = () => {
  return (
    <DefaultLayout>
      <div>Verify</div>
    </DefaultLayout>
  );
};

export default withProtectedRoute(Verify);
