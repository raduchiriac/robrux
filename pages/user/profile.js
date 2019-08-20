import React from 'react';
import { withProtectedRoute } from '../../lib/hocs/withAuth';
import { WithHeaderLayout } from '../../lib/layouts/WithHeaderLayout';

const Profile = props => {
  return <div>{Object.keys(props).join(',')}</div>;
};

Profile.getInitialProps = ctx => {
  // console.log(Object.keys(ctx));
  return { cookies: ctx.req.cookies, userId: ctx.req.userId };
};

Profile.Layout = WithHeaderLayout;

export default withProtectedRoute(Profile);
