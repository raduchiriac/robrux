import Router from 'next/router';

const LOCAL_KEY = 'loggedInUser';
export function localStorageSaveUser(data) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(data));
}
export function localStorageGetUser() {
  return JSON.parse(localStorage.getItem(LOCAL_KEY));
}
export function localStorageDeleteUser() {
  localStorage.removeItem(LOCAL_KEY);
}

// const redirectToThis = (context, target) => {
//   console.log('🚨[>>>] I redirect to:', target);

//   if (context.res) {
//     // server
//     // 303: "See other"
//     context.res.writeHead(303, { Location: target });
//     context.res.end();
//   } else {
//     // In the browser, we just pretend like this never even happened ;)
//     Router.replace(target);
//   }
// };

// const getToken = context => {
//   const { token } = nextCookie(context);
//   console.log('[🚨withAuth()] getToken', token);

//   return token;
// };

// // Gets the display name of a JSX component for dev tools
// const getDisplayName = Component => Component.displayName || Component.name || 'Component';

// function withProtectedRoute(WrappedComponent) {
//   return class extends Component {
//     static displayName = `withProtectedRoute(${getDisplayName(WrappedComponent)})`;

//     static async getInitialProps(ctx) {
//       console.log('[🚨withAuth()] getInitialProps', Object.keys(ctx));
//       const token = getToken(ctx);
//       const loggedInUser = await getLoggedIn(ctx.apolloClient);
//       const stableRoutes = ['/login', '/register', '/forgot', '/verify'];

//       // if (stableRoutes.includes((ctx.req && ctx.req.originalUrl) || '')) {
//       //   if (token) {
//       //     redirectToThis(ctx, '/browse');
//       //   }
//       // } else {
//       //   if (!token) {
//       //     redirectToThis(ctx, '/login');
//       //   }
//       // }

//       console.log('[🚨withAuth()] getInitialProps', token);

//       const componentProps = WrappedComponent.getInitialProps && (await WrappedComponent.getInitialProps(ctx));

//       return { ...componentProps, token, loggedInUser };
//     }

//     constructor(props) {
//       console.log('[🚨withAuth()] constructor', Object.keys(props));
//       super(props);
//     }

//     render() {
//       console.log('[🚨withAuth()] render', Object.keys(this.props));
//       return <WrappedComponent {...this.props} />;
//     }
//   };
// }

// // import gql from 'graphql-tag';
// // const getLoggedIn = client =>
// //   client
// //     .query({
// //       query: gql`
// //         query getUser {
// //           user {
// //             _id
// //             email
// //             firstName
// //             lastName
// //           }
// //         }
// //       `,
// //     })
// //     .then(({ data }) => data)
// //     // Fail gracefully
// //     .catch(() => ({}));

// const getLoggedIn = client => {};

// export { withProtectedRoute, redirectToThis };
