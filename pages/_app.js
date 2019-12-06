import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import CssBaseline from '@material-ui/core/CssBaseline';
import Router from 'next/router';
import { ThemeProvider } from '@material-ui/styles';
import { LanguagesContextProvider } from '~/lib/contexts/LanguagesContext';
import { GlobalContextProvider } from '~/lib/contexts/GlobalContext';
import { DefaultTheme } from '~/lib/themes/default-theme';
import { EmptyLayout } from '~/lib/layouts/EmptyLayout';

// This is here because sometimes the CSS/SCSS is not being loaded correctly in development mode
// https://github.com/zeit/next-plugins/issues/282
if (process.env.NODE_ENV !== 'production') {
  Router.events.on('routeChangeComplete', () => {
    const path = '/_next/static/chunks/styles.chunk.css';
    const chunksSelector = `link[href*="${path}"]:not([rel=preload])`;
    const chunksNodes = document.querySelectorAll(chunksSelector);
    if (chunksNodes.length) {
      const timestamp = new Date().valueOf();
      chunksNodes[0].href = `${path}?ts=${timestamp}`;
    }
  });
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
