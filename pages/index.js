import React from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Link from './src/Link';

import { ApolloProvider } from '@apollo/react-hooks';
import { WithHeaderLayout } from '../layouts/WithHeaderLayout';
import client from '../lib/apollo';
import IndexPage from './IndexPage';

export default function Index() {
  return (
    <ApolloProvider client={client}>
      <WithHeaderLayout>
        <IndexPage />
      </WithHeaderLayout>
    </ApolloProvider>
  );
}
