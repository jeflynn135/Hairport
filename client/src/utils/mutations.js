//login and adduser are here, but we will need mutations for other stuff
//add services mutation
import {gql} from "@apollo/client";

export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        token
        user {
            _id
            username
        }
    }
}`;

export const ADD_USER = gql`
mutation addUser($username: String!, $email: String!, $password: String!) {
addUser(username: $username, email: $email, password: $password) {
token
user {
_id
username
}
}
}`;


export const POST_REVIEW = gql`
mutation saveReview($reviewData: ReviewData!) {
    saveReview(reviewData: $reviewData) {
      _id
      user
      description
      service
    }
  }`;

export const UPDATE_REVIEW = gql`
mutation editReview($reviewId: ID!, $description: String!, $userId: ID!) {
    editReview(reviewId: $reviewId, description: $description, userId: $userId) {
      _id
      user
      description
      service
    }
  }`;

export const DELETE_REVIEW = gql`
mutation RemoveReview($reviewId: ID!) {
    removeReview(reviewId: $reviewId) {
        _id
        user
        description
        service
    }
}`;

