const faker = require('faker');
var ObjectID = require('mongodb').ObjectID;

const randomIntFromInterval = (min, max) => Math.random() * (max - min) + min;

const GIG_CREATE_FAKE = () => `
  mutation {
    createGig(input: {
      _userId: "${new ObjectID()}",
      _providerName: "${faker.name.firstName()} ${faker.name.lastName()}",
      _rating: ${Math.random() * 4 + 1},
      title: "${faker.company.catchPhrase()}",
      images: [
        "${faker.image.business()}/${Math.ceil(Math.random() * 20)}",
        "${faker.image.people()}/${Math.ceil(Math.random() * 20)}",
        "${faker.image.technics()}/${Math.ceil(Math.random() * 20)}}"
      ],
      description: "${faker.lorem.paragraph()}",
      location: {
        type: "Point",
        address: "${faker.address.streetAddress()}, ${faker.address.country()}",
        coordinates: [${randomIntFromInterval(50.75, 50.91)}, ${randomIntFromInterval(4.28, 4.45)}]
      },
      status: "valid",
      tags: [${faker.lorem
        .words()
        .split(' ')
        .map(w => `"${w}"`)
        .join(', ')}],
      price: ${Math.ceil(Math.random() * 5 + 1) * 10}
    }) {
      _id
    }
  }
`;

module.exports = { GIG_CREATE_FAKE };
