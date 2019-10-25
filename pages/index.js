import React from 'react';
import { redirectToThis } from '../lib/hocs/withAuth';
import withApollo from '../lib/hocs/withApollo';

const Index = () => {
  return (
    <div>
      This should redirect to <pre>/browse</pre>
    </div>
  );
};

Index.getInitialProps = props => {
  redirectToThis(props, '/browse');
  return {};
};

export default withApollo(Index);
