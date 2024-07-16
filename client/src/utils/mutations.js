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

export const SAVE_REVIEW =gql`
mutation saveReview($reviewData: ReviewData) {
saveReview(ReviewData: $ReviewData)
_id
username
email
reviewCount
savedReviews{
user
description
service
}
}`;

export const REMOVE_REVIEW=gql`
mutation removeReview($reviewId: ID!) {
removeReview(reviewId: $reviewId) {
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
}`;