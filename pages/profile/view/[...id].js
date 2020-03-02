import React from 'react';
import { AccountLayout } from '~/lib/layouts/AccountLayout';
import withApollo from '~/lib/hocs/withApollo';
import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';
import { useRouter } from 'next/router';

const Profile = () => {
  const router = useRouter();
  const id = router.query.id || '';
  return (
    <Container>
      {id}
      <Avatar alt="Name" src="/avatars/user.svg" />
    </Container>
  );
};

Profile.Layout = AccountLayout;

export default withApollo(Profile);
