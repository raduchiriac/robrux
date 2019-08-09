import gql from 'graphql-tag';

const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
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
