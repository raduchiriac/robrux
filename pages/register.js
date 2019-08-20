import React from 'react';
import RegisterPageContainer from '../components/RegisterPageContainer';
import { withProtectedRoute } from '../lib/hocs/withAuth';

const Register = () => {
  return <RegisterPageContainer />;
};

export default withProtectedRoute(Register);
