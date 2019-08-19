import React from 'react';
import { DefaultLayout } from '../layouts/DefaultLayout';
import RegisterPageContainer from '../components/RegisterPageContainer';
import { withProtectedRoute } from '../lib/hocs/withAuth';

const Register = () => {
  return (
    <DefaultLayout>
      <RegisterPageContainer />
    </DefaultLayout>
  );
};

export default withProtectedRoute(Register);
