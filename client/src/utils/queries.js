import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  {
    me {
    _id
    username
    email
    reviewCount
    savedReviews {
      user
      description
      service
    }
  }
  }
`;
