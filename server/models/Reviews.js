const { Schema, model } = require('mongoose');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedBooks` array in User.js
const reviewSchema = new Schema({
  user: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  service: {
    type: String,
    required: true,
  },
});

const Review = model("review", reviewSchema)

module.exports = Review;
