import { gql } from 'apollo-boost';

const CREATE_USER = gql`
  mutation($input: UserInputTypeRegister!) {
    register(input: $input) {
      _id
    }
  }
`;

const LOGIN_USER = gql`
  mutation($input: UserInputTypeLogin!) {
    login(input: $input) {
      token
    }
  }
`;

export { LOGIN_USER, CREATE_USER };
