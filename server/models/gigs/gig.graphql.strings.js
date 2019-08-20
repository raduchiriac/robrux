const faker = require('faker');
var ObjectID = require('mongodb').ObjectID;

const randomIntFromInterval = (min, max) => Math.random() * (max - min) + min;
const randomColor = () => {
  let letters = '0123456789ABCDEF';
  let color = '';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
const GIG_CREATE_FAKE = () => {
  const userID = new ObjectID();
  const title = faker.company.catchPhrase();
  const slug = title
    .split(' ')
    .join('-')
    .toLowerCase();
  return `
    mutation {
      createGig(input: {
        _userId: "${userID}",
        _providerName: "${faker.name.firstName()} ${faker.name.lastName()}",
        _rating: ${Math.random() * 4 + 1},
        title: "${title}",
        slug: "${slug}",
        images: [
          "https://i.pravatar.cc/256?u=${userID}",
          "https://via.placeholder.com/256x256/${randomColor()}/${randomColor()}?text=${title
    .match(/\b(\w)/g)
    .join('')
    .toUpperCase()}",
          "https://via.placeholder.com/256x256/${randomColor()}/${randomColor()}?text=${title
    .match(/\b(\w)/g)
    .join('')
    .toUpperCase()}"
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
