const typeDefs = `
  type User {
    _id: ID
    username: String!
    email: String
    reviewCount: Int
    savedReviews: [Review]
  }

  type Review {
    reviewId: ID!
    user: [String]
    description: String
  }

  type Auth {
    token: ID!
    user: User
  }

  input ReviewData {
    authors: [String]
    description: String!
    reviewId: String!
  }

  type Query {
    me: User
  }

  type Mutation {

    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveReview(reviewData: ReviewData!): User
    removeReview(reviewId: ID!): User
  }
`;

module.exports = typeDefs;
