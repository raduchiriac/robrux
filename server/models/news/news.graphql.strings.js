const faker = require('faker');

const NEWS_CREATE_FAKE = () => {
  const title = faker.company.catchPhrase();
  const content = faker.lorem.paragraph() + ' ' + faker.lorem.paragraph() + ' ' + faker.lorem.paragraph();
  return `
    mutation {
      createNews(input: {
        title: "${title}",
        images: [
          "https://picsum.photos/id/${Math.round(Math.random() * 1000)}/640/400",
          "https://picsum.photos/id/${Math.round(Math.random() * 1000)}/640/400",
          "https://picsum.photos/id/${Math.round(Math.random() * 1000)}/640/400",
          "https://picsum.photos/id/${Math.round(Math.random() * 1000)}/640/400",
        ],
        content: "${content}",
        richContent: "<div>${content}</div>",
        status: "live",
      }) {
        _id
      }
    }
`;
};

module.exports = { NEWS_CREATE_FAKE };
