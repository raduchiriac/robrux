import React from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ApolloProvider } from '@apollo/react-hooks';
import { ThemeProvider } from '@material-ui/styles';
import { LanguagesContextProvider } from '../lib/contexts/LanguagesContext';

import { DefaultTheme } from '../lib/themes/default-theme';
import client from '../lib/apollo';

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
        <LanguagesContextProvider>
          <Head>
            <title>ro:bux</title>
          </Head>
          <ThemeProvider theme={DefaultTheme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </LanguagesContextProvider>
      </ApolloProvider>
    );
  }
}

export default MyApp;
