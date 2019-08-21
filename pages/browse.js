import React from 'react';

import { WithHeaderLayout } from '../lib/layouts/WithHeaderLayout';
import IndexPageContainer from '../components/IndexPageContainer';

const Index = props => {
  return <IndexPageContainer />;
};

Index.Layout = WithHeaderLayout;

export default Index;
