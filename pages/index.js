import React from 'react';
import withApollo from '~/lib/hocs/withApollo';
import IndexPageContainer from '~/components/IndexPageContainer';

const Index = () => {
  return <IndexPageContainer />;
};

Index.getInitialProps = props => {
  return {};
};

export default withApollo(Index);
