import gql from 'graphql-tag';

const GET_NEWS = gql`
  query {
    news {
      _id
      title
      slug
      excerpt
      images
      createdAt
    }
  }
`;

const GET_ONE_NEWS = gql`
  query oneNews($idOrSlug: String!) {
    oneNews(idOrSlug: $idOrSlug) {
      title
      images
      richContent
      createdAt
    }
  }
`;

export { GET_NEWS, GET_ONE_NEWS };
