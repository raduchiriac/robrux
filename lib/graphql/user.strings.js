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

const GET_USER_INFO = gql`
  query userInfo($id: String!) {
    userInfo(id: $id) {
      avatar
      firstName
      lastName
      email
    }
  }
`;

export { LOGIN_USER, CREATE_USER, GET_USER_INFO };
