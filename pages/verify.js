import React from 'react';
import { withProtectedRoute } from '../lib/hocs/withAuth';

const Verify = () => {
  return <div>Verify</div>;
};

export default withProtectedRoute(Verify);
