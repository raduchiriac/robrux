import React from 'react';

import { WithHeaderLayout } from '~/lib/layouts/WithHeaderLayout';
import BrowsePageContainer from '~/components/BrowsePageContainer';
import withApollo from '~/lib/hocs/withApollo';

const Browse = props => {
  return <BrowsePageContainer searchingFor={props.search} />;
};

Browse.getInitialProps = async (context, res) => {
  const { search } = context.query;
  return { search };
};

Browse.Layout = WithHeaderLayout;

export default withApollo(Browse);
