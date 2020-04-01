import React from 'react';
import App from 'next/app';
import CssBaseline from '@material-ui/core/CssBaseline';
import cookies from 'next-cookies';
import jwt from 'jsonwebtoken';
import { UserContext } from '~/lib/contexts/UserContext';
import { GlobalContextProvider } from '~/lib/contexts/GlobalContext';
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
    user: {},
  };

  static async getInitialProps({ Component, ctx }) {
    const { token } = cookies(ctx);

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
          <CssBaseline />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </UserContext.Provider>
      </GlobalContextProvider>
    );
  }
}

export default NextApp;
