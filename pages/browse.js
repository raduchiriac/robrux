import React from 'react';

import { WithHeaderLayout } from '~/lib/layouts/WithHeaderLayout';
import BrowsePageContainer from '~/components/BrowsePageContainer';
import withApollo from '~/lib/hocs/withApollo';

const Browse = props => {
  return <BrowsePageContainer searchingFor={props.search} inLocation={props.location} />;
};

Browse.getInitialProps = async (context, res) => {
  const { search, location } = context.query;
  return { search, location };
};

Browse.Layout = WithHeaderLayout;

export default withApollo(Browse);
