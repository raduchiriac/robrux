import React from 'react';
import Logo from '../../src/components/Header/Logo';

import Dashboard from './pages/dashboard';

export default {
  logo: () => (
    <div style={{ width: 200, height: 230 }}>
      <Logo />
    </div>
  ),
  pages: () => [
    {
      label: 'Dashboard',
      path: '',
      component: Dashboard,
    },
    {
      label: 'People',
      children: ['User'],
    },
  ],
};
