const showdown = require('showdown');
const xssFilter = require('showdown-xss-filter');
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');

const markdownConverter = new showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
  extensions: [xssFilter],
});

const TimestampType = new GraphQLScalarType({
  name: 'Timestamp',
  serialize(date) {
    return date instanceof Date ? date.getTime() : null;
  },
  parseValue(date) {
    try {
      return new Date(value);
    } catch (error) {
      return null;
    }
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10));
    } else if (ast.kind === Kind.STRING) {
      return this.parseValue(ast.value);
    } else {
      return null;
    }
  },
});

module.exports = {
  markdownConverter,
  TimestampType,
  strippedString: str => str.replace(/(<([^>]+)>)/gi, ''),
};
