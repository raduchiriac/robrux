import React from 'react';
import { WithHeaderLayout } from '~/lib/layouts/WithHeaderLayout';
import withApollo from '~/lib/hocs/withApollo';

const Profile = props => {
  return <div>{Object.keys(props).join(',')}</div>;
};

Profile.Layout = WithHeaderLayout;

export default withApollo(Profile);
