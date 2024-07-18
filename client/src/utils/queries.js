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
export const QUERY_REVIEWS = gql`
query reviews {
  reviews {
    _id
    description
    service
    user
  }
}`
