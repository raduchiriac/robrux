const faker = require('faker');
var ObjectID = require('mongodb').ObjectID;

const randomFromInterval = (min, max, int = false) =>
  !int ? Math.random() * (max - min) + min : Math.ceil(Math.random() * (max - min) + min);

const GIG_CREATE_FAKE = () => {
  const userID = new ObjectID();
  const subscriptionID = new ObjectID();
  const title = faker.company.catchPhrase();
  const description = faker.lorem.paragraph() + ' ' + faker.lorem.paragraph() + ' ' + faker.lorem.paragraph();
  return `
    mutation {
      createGig(input: {
        _userId: "${userID}",
        _providerName: "${faker.name.firstName()} ${faker.name.lastName()}",
        _providerAvatar: "${faker.image.avatar()}",
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
          ...new Set([...Array(Math.round(Math.random() * 4))].map(() => Math.floor(Math.random() * 9))),
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
