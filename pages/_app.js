import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import { LanguagesContextProvider } from '~/lib/contexts/LanguagesContext';
import { GlobalContextProvider } from '~/lib/contexts/GlobalContext';
import { DefaultTheme } from '~/lib/themes/default-theme';
import { EmptyLayout } from '~/lib/layouts/EmptyLayout';

class NextApp extends App {
  static displayName = 'NextApp';

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps, apolloClient } = this.props;
    const Layout = Component.Layout || EmptyLayout;

    return (
      <GlobalContextProvider>
        <LanguagesContextProvider>
          <Head>
            <title>ro:bux</title>
          </Head>
          <ThemeProvider theme={DefaultTheme}>
            <CssBaseline />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
        </LanguagesContextProvider>
      </GlobalContextProvider>
    );
  }
}

export default NextApp;
