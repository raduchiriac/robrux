import React from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ApolloProvider } from '@apollo/react-hooks';
import client from '../lib/apollo';

import { ThemeProvider } from '@material-ui/styles';
import { DefaultTheme } from '../lib/themes/default-theme';

class MyApp extends App {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <ApolloProvider client={client}>
        <Head>
          <title>ro:bux</title>
        </Head>
        <ThemeProvider theme={DefaultTheme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </ApolloProvider>
    );
  }
}

export default MyApp;
