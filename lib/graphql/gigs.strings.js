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

export { SEARCH_GIG };
