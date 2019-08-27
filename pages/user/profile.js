import React from 'react';
import { withProtectedRoute } from '../../lib/hocs/withAuth';
import { WithHeaderLayout } from '../../lib/layouts/WithHeaderLayout';

const Profile = props => {
  return <div>{Object.keys(props).join(',')}</div>;
};

Profile.Layout = WithHeaderLayout;

export default withProtectedRoute(Profile);
