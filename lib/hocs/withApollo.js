import React from 'react';
import Head from 'next/head';
import { makeExecutableSchema } from 'graphql-tools';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { SchemaLink } from 'apollo-link-schema';
import { setContext } from 'apollo-link-context';
import cookie from 'cookie';
import typeDefs from '../graphql/_typedefs';
import resolvers from '../graphql/_resolvers';
import fetch from 'isomorphic-unfetch';

let globalApolloClient = null;

/**
 * Creates and provides the apolloContext
 * to a next.js PageTree. Use it by wrapping
 * your PageComponent via HOC pattern.
 * @param {Function|Class} PageComponent
 * @param {Object} [config]
 * @param {Boolean} [config.ssr=true]
 */
const withApollo = (PageComponent, { ssr = true } = {}) => {
  const HOC = ({ apolloClient, apolloState, ...pageProps }) => {
    const client = apolloClient || initApolloClient(undefined, apolloState);
    return (
      <ApolloProvider client={client}>
        <PageComponent {...pageProps} />
      </ApolloProvider>
    );
  };

  // Set the correct displayName in development
  if (process.env.NODE_ENV !== 'production') {
    const displayName = PageComponent.displayName || PageComponent.name || 'Component';

    if (displayName === 'App') {
      console.warn('This withApollo HOC only works with PageComponents.');
    }

    HOC.displayName = `withApollo(${displayName})`;
  }

  if (ssr || PageComponent.getInitialProps) {
    HOC.getInitialProps = async ctx => {
      const { AppTree } = ctx;

      // Initialize ApolloClient, add it to the ctx object so
      // we can use it in `PageComponent.getInitialProp`.
      const apolloClient = (ctx.apolloClient = initApolloClient({
        res: ctx.res,
        req: ctx.req,
      }));

      // Run wrapped getInitialProps methods
      let pageProps = {};
      if (PageComponent.getInitialProps) {
        pageProps = await PageComponent.getInitialProps(ctx);
      }

      // Only on the server:
      if (typeof window === 'undefined') {
        // When redirecting, the response is finished.
        // No point in continuing to render
        if (ctx.res && ctx.res.finished) {
          return pageProps;
        }

        // Only if ssr is enabled
        if (ssr) {
          try {
            // Run all GraphQL queries
            const { getDataFromTree } = await import('@apollo/react-ssr');
            await getDataFromTree(
              <AppTree
                pageProps={{
                  ...pageProps,
                  apolloClient,
                }}
              />
            );
          } catch (error) {
            // Prevent Apollo Client GraphQL errors from crashing SSR.
            // Handle them in components via the data.error prop:
            // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
            console.error('Error while running `getDataFromTree`', error);
          }

          // getDataFromTree does not call componentWillUnmount
          // head side effect therefore need to be cleared manually
          Head.rewind();
        }
      }

      // Extract query data from the Apollo store
      const apolloState = apolloClient.cache.extract();

      return {
        ...pageProps,
        apolloState,
      };
    };
  }

  // Pass-on the dynamic Layout
  HOC.Layout = PageComponent.Layout;

  return HOC;
};

export default withApollo;

/**
 * Always creates a new apollo client on the server
 * Creates or reuses apollo client in the browser.
 * @param  {Object} initialState
 */
function initApolloClient(ctx, initialState) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (typeof window === 'undefined') {
    return createApolloClient(ctx, initialState);
  }

  // Reuse client on the client-side
  if (!globalApolloClient) {
    globalApolloClient = createApolloClient(ctx, initialState);
  }

  return globalApolloClient;
}

/**
 * Creates and configures the ApolloClient
 * @param  {Object} [initialState={}]
 */
function createApolloClient(ctx = {}, initialState = {}) {
  const cache = new InMemoryCache().restore(initialState);

  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: createIsomorphLink(ctx),
    cache,
  });
}

function createIsomorphLink(ctx) {
  const fetchOptions = {};
  const getToken = ctx => {
    // const cookies = cookie.parse(req ? req.headers.cookie || '' : document.cookie);
    // return cookies.token;
  };
  // TODO: Rewrite [server] with import/exports so you can use the schemas from there
  if (false && typeof window === 'undefined') {
    // If you are using a https_proxy, add fetchOptions with 'https-proxy-agent' agent instance
    // 'https-proxy-agent' is required here because it's a sever-side only module
    if (process.env.https_proxy) {
      fetchOptions.agent = new (require('https-proxy-agent'))(process.env.https_proxy);
    }

    const schema = makeExecutableSchema({
      typeDefs,
      resolvers,
    });
    return new SchemaLink({ schema, context: ctx });
  } else {
    const httpLink = new HttpLink({
      credentials: 'same-origin',
      uri: `${process.env.HOSTNAME}:${Number(process.env.PORT) ? process.env.PORT : ''}${process.env.GRAPHQL_ROUTE}`,
      fetch,
      fetchOptions,
    });

    const authLink = setContext((request, { headers }) => {
      const token = getToken();
      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : '',
        },
      };
    });

    return authLink.concat(httpLink);
  }
}
