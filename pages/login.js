import React from 'react';
import { DefaultLayout } from '../layouts/DefaultLayout';
import { LoginPageContainer } from '../components/LoginPageContainer';
import { withProtectedRoute } from '../lib/hocs/withAuth';

const Login = () => {
  return (
    <DefaultLayout>
      <LoginPageContainer />
    </DefaultLayout>
  );
};

export default withProtectedRoute(Login);
