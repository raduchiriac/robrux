import React from 'react';
import { AccountLayout } from '~/lib/layouts/AccountLayout';
import withApollo from '~/lib/hocs/withApollo';
import ProfileContainer from '~/components/ProfileContainer';

const Profile = props => {
  return <ProfileContainer />;
};

Profile.Layout = AccountLayout;

export default withApollo(Profile);
