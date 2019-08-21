import { Component } from 'react';
import Router from 'next/router';
import nextCookie from 'next-cookies';

const redirectToThis = (context, target) => {
  if (context.res) {
    // server
    // 303: "See other"
    context.res.writeHead(303, { Location: target });
    context.res.end();
  } else {
    // In the browser, we just pretend like this never even happened ;)
    Router.replace(target);
  }
};

const getToken = context => {
  const { token } = nextCookie(context);
  // const bouncingRoutes = ['/login', '/register', '/forgot', '/verify'];

  // console.log('context', context);

  // if (bouncingRoutes.includes((context.req && context.req.originalUrl) || '')) {
  //   if (token) {
  //     redirectToThis(context, '/');
  //   }
  // } else {
  //   if (!token) {
  //     redirectToThis(context, '/login');
  //   }
  // }

  return token;
};

// Gets the display name of a JSX component for dev tools
const getDisplayName = Component => Component.displayName || Component.name || 'Component';

function withProtectedRoute(WrappedComponent) {
  return class extends Component {
    static displayName = `withProtectedRoute(${getDisplayName(WrappedComponent)})`;

    static async getInitialProps(ctx) {
      const token = getToken(ctx);

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

// TODO: use a string from outside
import gql from 'graphql-tag';
const getLoggedIn = client =>
  client
    .query({
      query: gql`
        query getUser {
          user {
            _id
            email
            firstName
            lastName
          }
        }
      `,
    })
    .then(({ data }) => {
      return { loggedInUser: data };
    })
    .catch(() => {
      // Fail gracefully
      return { loggedInUser: {} };
    });

export { withProtectedRoute, getLoggedIn, redirectToThis };
