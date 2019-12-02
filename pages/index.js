import React from 'react';
import withApollo from '~/lib/hocs/withApollo';
import { useRouter } from 'next/router';

import IndexPageContainer from '~/components/IndexPageContainer';

const Index = () => {
  const router = useRouter();
  return <IndexPageContainer login={router.query.login || ''} />;
};

Index.getInitialProps = props => {
  return {};
};

export default withApollo(Index);
