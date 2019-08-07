import React from 'react';

import { ApolloProvider } from '@apollo/react-hooks';
import { WithHeaderLayout } from '../layouts/WithHeaderLayout';
import client from '../lib/apollo';
import IndexPage from '../components/IndexPage';

export default function Index() {
  return (
    <ApolloProvider client={client}>
      <WithHeaderLayout>
        <IndexPage />
      </WithHeaderLayout>
    </ApolloProvider>
  );
}
