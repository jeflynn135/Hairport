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

// export const SAVE_REVIEW =gql`
// mutation SaveReview($reviewData: ReviewData!) {
//   saveReview(reviewData: $reviewData)
// _id
// username
// email
// reviewCount
// savedReviews{
// user
// description
// service
// }
// }
// `;

// export const REMOVE_REVIEW=gql`
// mutation removeReview($reviewId: ID!) {
//   removeReview(reviewId: $reviewId) {
//     _id
//     username
//     email
//     reviewCount
//     savedReviews {
//       user
//       description
//       service
//     }
//   }
// }
// `;

// export const EDIT_REVIEW=gql`
// mutation EditReview($reviewId: ID!) {
//   editReview(reviewId: $reviewId) {
//     _id
//     username
//     email
//     reviewCount
//     savedReviews {
//       user
//       description
//       service
//     }
//   }
// }
// `;
export const GET_REVIEWS = gql`
query GetReviews {
    reviews {
     _id
     text
    }
}`;

export const POST_REVIEW = gql`
mutation SaveReview($reviewData: ReviewData!) {
    saveReview(reviewData: $reviewData) {
        _id
        username
        email
        reviewCount
        savedReviews {
            user
            description
            service
            _id
        }
    }
}`;

export const UPDATE_REVIEW = gql`
mutation EditReview($reviewId: ID!, $text: String!) {
    editReview(reviewId: $reviewId, text: $text) {
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

