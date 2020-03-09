const faker = require('faker');
const randomFromInterval = require('../../_helpers/utils').randomFromInterval;
const ObjectID = require('mongodb').ObjectID;

const GIG_CREATE_FAKE = data => {
  const subscriptionID = new ObjectID();
  const title = faker.company.catchPhrase();
  const description = faker.lorem.paragraph() + ' ' + faker.lorem.paragraph() + ' ' + faker.lorem.paragraph();
  return `
    mutation {
      createGig(input: {
        _userId: "${data.userId}",
        _rating: ${Math.random() * 4 + 1},
        _subscription: "${Math.random() >= 0.5 ? subscriptionID : ''}",
        title: "${title}",
        images: [
          "https://picsum.photos/id/${Math.round(Math.random() * 1000)}/640/400",
          "https://picsum.photos/id/${Math.round(Math.random() * 1000)}/640/400",
          "https://picsum.photos/id/${Math.round(Math.random() * 1000)}/640/400",
          "https://picsum.photos/id/${Math.round(Math.random() * 1000)}/640/400",
          "https://picsum.photos/id/${Math.round(Math.random() * 1000)}/640/400",
        ],
        description: "${description}",
        location: {
          type: "Point",
          address: "${faker.address.streetAddress()}, ${faker.address.country()}",
          coordinates: [${randomFromInterval(50.75, 50.91)}, ${randomFromInterval(4.28, 4.45)}]
        },
        categories: [${[
          ...new Set([...Array(Math.round(Math.random() * 4))].map(() => Math.floor(Math.random() * 30))),
        ]}],
        status: "valid",
        tags: [${faker.lorem
          .words()
          .split(' ')
          .map(w => `"${w}"`)
          .join(', ')}],
        price: ${Math.round(Math.random() * 6) * 10},
        priceRange: [${randomFromInterval(5, 40, true) * 10}, ${randomFromInterval(45, 90, true) * 10}]
      }) {
        _id
      }
    }
`;
};

module.exports = { GIG_CREATE_FAKE };
