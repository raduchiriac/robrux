import React from 'react';
import { withProtectedRoute } from '../lib/hocs/withAuth';

const Forgot = () => {
  return <div>Forgot</div>;
};

export default withProtectedRoute(Forgot);
