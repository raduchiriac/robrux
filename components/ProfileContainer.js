import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';

import React from 'react';

import './ProfileContainer.scss';

export default function ProfileContainer() {
  return (
    <Container>
      <Avatar alt="" src="/avatars/user.svg" />
    </Container>
  );
}
