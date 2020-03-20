import gql from 'graphql-tag';

const SEARCH_GIG = gql`
  query search($term: String!, $limit: Int) {
    search(term: $term, limit: $limit) {
      _id
      _userId {
        firstName
        lastName
        avatar
      }
      _rating
      slug
      title
      richDescription
    }
  }
`;

const GET_ONE_GIG = gql`
  query oneGig($idOrSlug: String!) {
    oneGig(idOrSlug: $idOrSlug) {
      _id
      slug
      title
      _userId {
        _id
        firstName
        lastName
        avatar
      }
      _rating
      _ratings {
        _userId
        score
        comment
        createdAt
      }
      price
      priceRange
      images
      richDescription
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
  query gigs($limit: Int!, $sort: String!, $bbox: [[Float]]!, $search: String, $category: Int) {
    gigs(limit: $limit, sort: $sort, bbox: $bbox, search: $search, category: $category) {
      _id
      _userId {
        firstName
        lastName
        avatar
      }
      _rating
      title
      price
      priceRange
      slug
      location {
        coordinates
      }
    }
  }
`;

export { SEARCH_GIG, SEARCH_BBOX_GIG, GET_ONE_GIG };
