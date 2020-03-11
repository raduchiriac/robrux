import React from 'react';
import Error404 from '~/components/Error/404';
import Error500 from '~/components/Error/500';
import { WebsiteHeaderFooterLayout } from '~/lib/layouts/WebsiteHeaderFooterLayout';

function Error({ statusCode }) {
  if (statusCode === 404) return <Error404 />;
  else if (statusCode === 500) return <Error500 />;
  return <p>{statusCode ? `⚠️ An error ${statusCode} occurred on server` : ''}</p>;
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 500;
  return { statusCode };
};

Error.Layout = WebsiteHeaderFooterLayout;

export default Error;
