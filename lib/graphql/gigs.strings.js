import { gql } from 'apollo-boost';

const SEARCH_GIG = gql`
  query search($term: String!) {
    search(term: $term) {
      _id
      title
      images
      description
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
      images
      location {
        coordinates
      }
    }
  }
`;

export { SEARCH_GIG, SEARCH_BBOX_GIG };
