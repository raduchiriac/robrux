const { GraphQLClient } = require('graphql-request');

const client = new GraphQLClient('http://localhost:4000/graphql', {
  // headers: {
  //   Authorization: 'Bearer my-jwt-token',
  // },
});

for (let i = 0; i < 10; i++) {
  const query = require('./gigs/gig.graphql.strings').GIG_CREATE();
  client.request(query).then(data => console.log(data));
}
