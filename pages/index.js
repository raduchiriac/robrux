import React from 'react';

import { WithHeaderLayout } from '../layouts/WithHeaderLayout';
import IndexPageContainer from '../components/IndexPageContainer';

export default function Index() {
  return (
    <WithHeaderLayout>
      <IndexPageContainer />
    </WithHeaderLayout>
  );
}
