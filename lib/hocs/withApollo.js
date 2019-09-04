import React from 'react';
import cookie from 'cookie';
import PropTypes from 'prop-types';
import { getDataFromTree } from '@apollo/react-ssr';
import Head from 'next/head';
import fetch from 'isomorphic-unfetch';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';

let apolloClient = null;

// Polyfill fetch() on the server (used by apollo-client)
if (typeof window === 'undefined') {
  global.fetch = fetch;
}

const create = (initialState, { getToken, fetchOptions }) => {
  const httpLink = createHttpLink({
    uri: process.env.GRAPHQL_ROUTE,
    credentials: 'same-origin',
    fetchOptions,
  });

  const authLink = setContext((_, { headers }) => {
    const token = getToken();
    console.log('[🚨authLink] token:', token);
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  const isBrowser = typeof window !== 'undefined';
  return new ApolloClient({
    connectToDevTools: isBrowser,
    ssrMode: !isBrowser, // Disables forceFetch on the server (so queries are only run once)
    link: authLink.concat(httpLink),
    cache: new InMemoryCache().restore(initialState || {}),
  });
};

const initApollo = (initialState, options) => {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (typeof window === 'undefined') {
    let fetchOptions = {};
    // If you are using a https_proxy, add fetchOptions with 'https-proxy-agent' agent instance
    // 'https-proxy-agent' is required here because it's a sever-side only module
    // if (process.env.https_proxy) {
    //   fetchOptions = {
    //     agent: new (require('https-proxy-agent'))(process.env.https_proxy)
    //   }
    // }
    return create(initialState, {
      ...options,
      fetchOptions,
    });
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState, options);
  }

  return apolloClient;
};

const parseCookies = (req, options = {}) => {
  return cookie.parse(req ? req.headers.cookie || '' : document.cookie, options);
};

export default App => {
  return class WithData extends React.Component {
    // It is needed for better devtools experience. Check how react devtools shows it: "MyApp WithData"
    static displayName = `WithData(${App.displayName})`;

    // Since apolloState is required but it is missed before this method returns the new props,
    // so it is needed to provide defaults
    static defaultProps = {
      apolloState: {},
    };

    static propTypes = {
      apolloState: PropTypes.object.isRequired,
    };

    static async getInitialProps(ctx) {
      const {
        AppTree,
        ctx: { req, res },
      } = ctx;
      const apollo = initApollo(
        {},
        {
          getToken: () => parseCookies(req).token,
        }
      );

      ctx.ctx.apolloClient = apollo;
      console.log('🚨[withApollo()] getInitialProps 1:', Object.keys(ctx), '🚨', Object.keys(ctx.ctx));

      let appProps = {};
      if (App.getInitialProps) {
        appProps = await App.getInitialProps(ctx);
      }

      console.log('🚨[withApollo()] getInitialProps 2:', Object.keys(appProps));

      if (res && res.finished) {
        console.log('🚨[withApollo res.finished] No point in continuing to render');
        // When redirecting, the response is finished.
        // No point in continuing to render
        return {};
      }

      if (typeof window === 'undefined') {
        // Run all graphql queries in the component tree
        // and extract the resulting data
        try {
          // Run all GraphQL queries
          await getDataFromTree(<AppTree {...appProps} apolloClient={apollo} />);
        } catch (error) {
          // Prevent Apollo Client GraphQL errors from crashing SSR.
          // Handle them in components via the data.error prop:
          // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
          console.log('🚨Error while running `getDataFromTree`', error);
        }

        // getDataFromTree does not call componentWillUnmount
        // head side effect therefore need to be cleared manually
        Head.rewind();
      }

      // Extract query data from the Apollo's store
      const apolloState = apollo.cache.extract();

      return {
        ...appProps,
        apolloState,
      };
    }

    constructor(props) {
      super(props);
      // `getDataFromTree` renders the component first, the client is passed off as a property.
      // After that rendering is done using Next's normal rendering pipeline
      this.apolloClient = initApollo(props.apolloState, {
        getToken: () => {
          return parseCookies().token;
        },
      });
    }

    render() {
      return <App apolloClient={this.apolloClient} {...this.props} />;
    }
  };
};
