import gql from 'graphql-tag';

const SEARCH_GIG = gql`
  query search($term: String!) {
    search(term: $term) {
      _id
      slug
      title
      images
      description
    }
  }
`;

const GET_ONE_GIG = gql`
  query oneGig($idOrSlug: String!) {
    oneGig(idOrSlug: $idOrSlug) {
      _id
      slug
      title
      images
      location {
        coordinates
        address
      }
    }
  }
`;

const SEARCH_BBOX_GIG = gql`
  query gigs($limit: Int!, $sort: String!, $bbox: [[Float]]!) {
    gigs(limit: $limit, sort: $sort, bbox: $bbox) {
      _id
      _providerName
      _rating
      title
      price
      slug
      images
      location {
        coordinates
      }
    }
  }
`;

export { SEARCH_GIG, SEARCH_BBOX_GIG, GET_ONE_GIG };
