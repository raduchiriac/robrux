import React from 'react';

import { WithHeaderLayout } from '../layouts/WithHeaderLayout';
import IndexPageContainer from '../components/IndexPageContainer';

const Index = props => {
  return (
    <WithHeaderLayout>
      <IndexPageContainer />
    </WithHeaderLayout>
  );
};

// Index.getInitialProps = ctx => ({ client: ctx.apolloClient });

export default Index;
