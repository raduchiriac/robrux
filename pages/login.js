import React from 'react';
import { LoginPageContainer } from '../components/LoginPageContainer';
import withApollo from '../lib/hocs/withApollo';

const Login = () => {
  return <LoginPageContainer />;
};

export default withApollo(Login);
