import { Component } from 'react';
import Router from 'next/router';
import nextCookie from 'next-cookies';

// Gets the display name of a JSX component for dev tools
const getDisplayName = Component => Component.displayName || Component.name || 'Component';

function withProtectedRoute(WrappedComponent) {
  return class extends Component {
    static displayName = `withProtectedRoute(${getDisplayName(WrappedComponent)})`;

    static async getInitialProps(ctx) {
      const token = checkAuth(ctx);

      const componentProps = WrappedComponent.getInitialProps && (await WrappedComponent.getInitialProps(ctx));

      return { ...componentProps, token };
    }

    constructor(props) {
      super(props);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
}

const bounceTo = (ctx, url) => {
  if (ctx.req) {
    ctx.res.writeHead(302, { Location: url });
    ctx.res.end();
  } else {
    Router.push(url);
  }
};

const checkAuth = ctx => {
  const { token } = nextCookie(ctx);
  if (!token) {
    // If `ctx.req` is available it means we are on the server.
    bounceTo(ctx.req, '/login');
  } else {
    // If you are logged-in and you are on one of these routes, bounce to root
    const bouncingRoutes = ['/login', '/register', '/forgot', '/verify'];
    console.log(ctx.req.originalUrl, bouncingRoutes.includes(ctx.req.originalUrl));

    if (bouncingRoutes.includes(ctx.req.originalUrl)) {
      bounceTo(ctx, '/');
    }
  }

  return token;
};

export { withProtectedRoute };
