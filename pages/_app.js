import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import { TranslationsContextProvider } from '~/lib/contexts/TranslationsContext';
import { GlobalContextProvider } from '~/lib/contexts/GlobalContext';
import { LightTheme } from '~/lib/themes/light-theme';
import { EmptyLayout } from '~/lib/layouts/EmptyLayout';

if (process.env.NODE_ENV !== 'production') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React);
}

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
        <TranslationsContextProvider>
          <Head>
            <title>ro:bux</title>
          </Head>
          <ThemeProvider theme={LightTheme}>
            <CssBaseline />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
        </TranslationsContextProvider>
      </GlobalContextProvider>
    );
  }
}

export default NextApp;
