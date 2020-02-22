import gql from 'graphql-tag';

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
      _id
    }
  }
`;

export { LOGIN_USER, CREATE_USER };
