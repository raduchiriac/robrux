import React from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ApolloProvider } from '@apollo/react-hooks';
import { ThemeProvider } from '@material-ui/styles';
import { LanguagesContextProvider } from '../lib/contexts/LanguagesContext';
import { GlobalContextProvider } from '../lib/contexts/GlobalContext';

import { DefaultTheme } from '../lib/themes/default-theme';
import withApollo from '../lib/apollo';

class MyApp extends App {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    pageProps.query = ctx.query;
    return { pageProps };
  }

  render() {
    const { Component, pageProps, apollo } = this.props;

    return (
      <ApolloProvider client={apollo}>
        <GlobalContextProvider>
          <LanguagesContextProvider>
            <Head>
              <title>ro:bux</title>
            </Head>
            <ThemeProvider theme={DefaultTheme}>
              <CssBaseline />
              <Component {...pageProps} />
            </ThemeProvider>
          </LanguagesContextProvider>
        </GlobalContextProvider>
      </ApolloProvider>
    );
  }
}

export default withApollo(MyApp);
