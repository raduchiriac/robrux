import React from 'react';
import withApollo from '~/lib/hocs/withApollo';
import { WebsiteHeaderLayout } from '~/lib/layouts/WebsiteHeaderLayout';

const News = () => {
  return <div>News</div>;
};
News.Layout = WebsiteHeaderLayout;

export default withApollo(News);
