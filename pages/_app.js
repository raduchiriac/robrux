import React from 'react';
import App from 'next/app';
import { Helmet } from 'react-helmet';
import CssBaseline from '@material-ui/core/CssBaseline';
import cookies from 'next-cookies';
import jwt from 'jsonwebtoken';
import { UserContext } from '~/lib/contexts/UserContext';
import { GlobalContextProvider } from '~/lib/contexts/GlobalContext';
import { ThemeProvider } from '@material-ui/styles';
import { LightTheme } from '~/lib/themes/light-theme';
import { DarkTheme } from '~/lib/themes/dark-theme';
import { EmptyLayout } from '~/lib/layouts/EmptyLayout';

import './_app.css';
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-mde/lib/styles/css/react-mde-all.css';
import whyDidYouRender from '@welldone-software/why-did-you-render';

if (false && typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  whyDidYouRender(React);
}

class NextApp extends App {
  static displayName = 'NextApp';
  state = {
    // TODO: Make this dynamic somehow
    // lang: 'ro',
    // theme: 'light',
    user: {},
  };

  static async getInitialProps({ Component, ctx }) {
    const { token, theme, lang } = cookies(ctx);

    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
    const user = token ? jwt.verify(token, process.env.JWT_SECRET) : {};

    return { pageProps, user };
  }

  componentDidMount() {
    const { user } = this.props;

    if (user._id) {
      if (user._id !== this.state.user._id) {
        this.setState({ user });
      }
    }

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
        <UserContext.Provider value={{ user: this.state.user }}>
          <Helmet
            // TODO: Make this dynamic somehow
            htmlAttributes={{ lang: 'ro' }}
            // TODO: Make this dynamic somehow STRINGS.SITE_NAME
            defaultTitle="ro:brux"
            titleTemplate="%s | ro:brux"
            meta={[
              {
                name: 'viewport',
                content: 'minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no',
              },
              { name: 'description', content: 'Romanian Professionals living in Belgium' },
            ]}
          />
          <ThemeProvider theme={this.state.theme == 'light' ? LightTheme : DarkTheme}>
            <CssBaseline />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
        </UserContext.Provider>
      </GlobalContextProvider>
    );
  }
}

export default NextApp;
