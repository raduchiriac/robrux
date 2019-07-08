const graphqlHTTP = require("express-graphql");
const { buildSchema } = require("graphql");

const schema = buildSchema(`
  type Query {
    gigs: [Gig]
  }
  type Gig {
    _userId: ID,
    _providerName: String,
    _rating: Float,
    title: String,
    image: [String],
    price: Int
  }
`);

const graph_http = graphqlHTTP({
  schema,
  graphiql: true
});

module.exports = graph_http;
