import React from 'react';
import { redirectToThis } from '../lib/hocs/withAuth';

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

export default Index;
