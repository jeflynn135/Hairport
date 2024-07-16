const typeDefs = `
  type User {
    _id: ID
    username: String!
    email: String
    reviewCount: Int
    savedReviews: [Review]
  }

  type Review {
    user: String
    description: String
    service: String
  }

  type Auth {
    token: ID!
    user: User
  }

  input ReviewData {
    user: String
    description: String!
    service: String!
  }

  type Query {
    me: User
  }

  type Mutation {

    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveReview(reviewData: ReviewData!): User
    removeReview(reviewId: ID!): User
    editReview(reviewId: ID!): User
  }
`;

module.exports = typeDefs;
