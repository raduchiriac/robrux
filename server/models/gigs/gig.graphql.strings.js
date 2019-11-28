const faker = require('faker');
var ObjectID = require('mongodb').ObjectID;

const randomIntFromInterval = (min, max) => Math.random() * (max - min) + min;

const GIG_CREATE_FAKE = () => {
  const userID = new ObjectID();
  const subscriptionID = new ObjectID();
  const title = faker.company.catchPhrase();
  return `
    mutation {
      createGig(input: {
        _userId: "${userID}",
        _providerName: "${faker.name.firstName()} ${faker.name.lastName()}",
        _providerAvatar: "https://i.pravatar.cc/128?u=${userID}",
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
};

module.exports = { GIG_CREATE_FAKE };
