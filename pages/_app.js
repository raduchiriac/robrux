import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import { TranslationsContextProvider } from '~/lib/contexts/TranslationsContext';
import { GlobalContextProvider } from '~/lib/contexts/GlobalContext';
import { LightTheme } from '~/lib/themes/light-theme';
import { EmptyLayout } from '~/lib/layouts/EmptyLayout';

import cookies from 'next-cookies';

import './_app.css';
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-mde/lib/styles/css/react-mde-all.css';

class NextApp extends App {
  static displayName = 'NextApp';

  static async getInitialProps({ Component, ctx }) {
    const { token } = cookies(ctx);
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

    return { pageProps };
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps } = this.props;
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
