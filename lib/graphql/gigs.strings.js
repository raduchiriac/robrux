import gql from 'graphql-tag';

const SEARCH_GIG = gql`
  query search($term: String!, $limit: Int) {
    search(term: $term, limit: $limit) {
      _id
      _providerAvatar
      _rating
      slug
      title
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
      _providerName
      _providerAvatar
      _rating
      price
      images
      description
      tags
      categories
      location {
        coordinates
        address
      }
    }
  }
`;

const SEARCH_BBOX_GIG = gql`
  query gigs($limit: Int!, $sort: String!, $bbox: [[Float]]!, $searchingFor: String) {
    gigs(limit: $limit, sort: $sort, bbox: $bbox, searchingFor: $searchingFor) {
      _id
      _providerName
      _providerAvatar
      _rating
      title
      price
      slug
      location {
        coordinates
      }
    }
  }
`;

export { SEARCH_GIG, SEARCH_BBOX_GIG, GET_ONE_GIG };
