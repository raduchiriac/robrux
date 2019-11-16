import React from 'react';
import RegisterPageContainer from '~/components/RegisterPageContainer';
import withApollo from '~/lib/hocs/withApollo';

const Register = () => {
  return <RegisterPageContainer />;
};

export default withApollo(Register);
