import React from 'react';

import { WithHeaderLayout } from '../layouts/WithHeaderLayout';
import IndexPage from '../components/IndexPage';

export default function Index() {
  return (
    <WithHeaderLayout>
      <IndexPage />
    </WithHeaderLayout>
  );
}
