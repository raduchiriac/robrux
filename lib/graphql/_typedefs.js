import gql from 'graphql-tag';

const typeDefs = gql`
  type User {
    id: ID!
    email: String!
  }
`;
export default typeDefs;
