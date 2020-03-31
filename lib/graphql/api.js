const API_URL = `${process.env.HOSTNAME}:${Number(process.env.PORT) ? process.env.PORT : ''}${
  process.env.GRAPHQL_ROUTE
}`;

async function fetchAPI(query, { variables } = {}) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // TODO: Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error('Failed to fetch API');
  }
  return json.data;
}

import { GET_ONE_NEWS } from './news.strings';
export async function getNewsBySlug(idOrSlug) {
  const data = await fetchAPI(GET_ONE_NEWS, {
    variables: {
      idOrSlug,
    },
  });
  console.log(data);
  return data?.post;
}
