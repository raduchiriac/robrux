import { gql } from 'apollo-boost';

const LOGIN_USER = gql`
  mutation($input: UserInputTypeLogin!) {
    login(input: $input) {
      email
    }
  }
`;

const CREATE_USER = gql`
  mutation($input: UserInputTypeRegister!) {
    register(input: $input) {
      _id
    }
  }
`;

export { LOGIN_USER, CREATE_USER };
