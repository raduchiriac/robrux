import gql from 'graphql-tag';

const addRatingMutation = gql`
  mutation($_gigId: ID!, $_userId: ID!, $score: Int!, $comment: String) {
    addRating(_gigId: $_gigId, _userId: $_userId, score: $score, comment: $comment) {
      _id
    }
  }
`;

const updateRatingMutation = gql`
  mutation($id: String!, $_gigId: ID!, $_userId: ID!, $score: Int!, $comment: String) {
    updateRating(_id: $id, _gigId: $_gigId, _userId: $_userId, score: $score, comment: $comment) {
      _id
      _gigId
      _userId
      score
      comment
    }
  }
`;

const deleteRatingMutation = gql`
  mutation($id: String!) {
    deleteRating(_id: $id) {
      _id
      _gigId
      _userId
      score
      comment
    }
  }
`;

export { addRatingMutation, updateRatingMutation, deleteRatingMutation };
