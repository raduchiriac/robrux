import React from 'react';
import { withProtectedRoute } from '../../lib/hocs/withAuth';

const Profile = props => {
  return <div>{Object.keys(props).join(',')}</div>;
};

Profile.getInitialProps = ctx => {
  // console.log(Object.keys(ctx));
  return { cookies: ctx.req.cookies, userId: ctx.req.userId };
};

export default withProtectedRoute(Profile);
