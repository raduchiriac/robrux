import React from 'react';
import { LoginPageContainer } from '../components/LoginPageContainer';
import { withProtectedRoute } from '../lib/hocs/withAuth';

const Login = () => {
  return <LoginPageContainer />;
};

export default withProtectedRoute(Login);
