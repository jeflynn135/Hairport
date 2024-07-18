const typeDefs = `
  type User {
    _id: ID
    username: String!
    email: String
    reviewCount: Int
    savedReviews: [Review]
  }

  type Review {
  _id: ID
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
    reviews: [Review]
  }

  type Mutation {

    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveReview(reviewData: ReviewData!): Review
    removeReview(reviewId: ID!): Review
    editReview(reviewId: ID!, description: String!, userId: ID!): Review
  }
`;

module.exports = typeDefs;
