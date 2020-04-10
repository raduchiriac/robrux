import gql from 'graphql-tag';

const typeDefs = gql`
  type User {
    _id: ID!
    email: String!
  }
`;
export default typeDefs;
