import gql from 'graphql-tag';

export default (context, apolloClient) => {
  return apolloClient
    .query({
      query: gql`
        query profile {
          profile {
            fullname
            email
          }
        }
      `,
    })
    .then(({ data }) => {
      return { loggedInUser: data };
    })
    .catch(e => {
      // Fail gracefully
      return { loggedInUser: {} };
    });
};
