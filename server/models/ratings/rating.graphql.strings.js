const faker = require('faker');
const ObjectID = require('mongodb').ObjectID;

const RATING_CREATE_FAKE = data => {
  return `
    mutation {
      addRating(input: {
        _gigId: "${data._gigId}",
        _userId: "${data._userId}",
        comment: "${data.comment}",
        score: ${data.score}
      }) {
        _id
      }
    }
`;
};

const FAKE_RATING_DATA = data => ({
  _gigId: data.gigId || new ObjectID(),
  _userId: data.userId || new ObjectID(),
  score: Math.round(Math.random() * 4) + 1,
  comment: faker.lorem.paragraph(),
});

module.exports = { RATING_CREATE_FAKE, FAKE_RATING_DATA };
