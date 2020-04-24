const faker = require('faker');

const USER_CREATE_FAKE = data => {
  return `
    mutation {
      register(input: {
        firstName: "${faker.name.firstName()}",
        lastName: "${faker.name.lastName()}",
        email: "${data.email || faker.internet.email()}",
        avatar: "${faker.image.avatar()}",
        password: "demodemo",
        confirmPassword: "demodemo"
        }) {
        _id
      }
    }
  `;
};

module.exports = { USER_CREATE_FAKE };
