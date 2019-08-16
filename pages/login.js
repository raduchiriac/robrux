import React from 'react';
import { DefaultLayout } from '../layouts/DefaultLayout';
import { LoginPageContainer } from '../components/LoginPageContainer';

export default function Login() {
  return (
    <DefaultLayout>
      <LoginPageContainer />
    </DefaultLayout>
  );
}
