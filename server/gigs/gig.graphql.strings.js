const faker = require('faker');
var ObjectID = require('mongodb').ObjectID;

const randomIntFromInterval = (min, max) => Math.random() * (max - min) + min;

const GIG_CREATE = () => `
  mutation {
    createGig(input: {
      _userId: "${new ObjectID()}",
      _providerName: "${faker.name.firstName()} ${faker.name.lastName()}",
      _rating: ${Math.random() * 4 + 1},
      title: "${faker.company.catchPhrase()}",
      images: [
        "${faker.image.business()}/${Math.ceil(Math.random() * 300)}",
        "${faker.image.people()}/${Math.ceil(Math.random() * 300)}",
        "${faker.image.technics()}/${Math.ceil(Math.random() * 300)}}"
      ],
      description: "${faker.lorem.paragraph()}",
      location: {
        address: "${faker.address.streetAddress()}, ${faker.address.country()}",
        coordinates: [${randomIntFromInterval(50.75, 50.91)}, ${randomIntFromInterval(4.28, 4.45)}]
      },
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

const GIG_GET_WITHIN_BOUNDS = () => `
  {
    gigs {
      _id
      title
      location {
        coordinates
      }
    }
  }
`;

module.exports = { GIG_CREATE, GIG_GET_WITHIN_BOUNDS };
