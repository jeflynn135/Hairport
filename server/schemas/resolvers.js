const { User, Review } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userInfo = await User.findOne({ _id: context.user._id }).select('-__v -password');

        return userInfo;
        // delete else when context working
      } else {
        const userInfo = await User.findOne({ _id: context.user._id }).select('-__v -password');

        return userInfo;
      }

      throw AuthenticationError;
    },
    reviews: async(parent, args, context) => {
      return Review.find()
    }
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      console.log(user)
      if (!user) {
        console.log("no user")
        throw AuthenticationError;
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        console.log("bad password")
        throw AuthenticationError;
      }
      const token = signToken(user);
      return { token, user };
    },
    saveReview: async (parent, { reviewData }, context) => {
      if (context.user) {
        const review = await Review.create(reviewData)
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { savedReviews: review._id } },
          { new: true }
        );
        return review;
      }
      throw AuthenticationError;
    },
    editReview: async (parent, { reviewId, description, userId }, context) => {
        if (context.user._id === userId) {
            const updatedUser = await Review.findOneAndUpdate(
                {_id: reviewId },
                { $set: { description: description
                    },
                 },
                { new: true }
            );
            return updatedUser;
        }
        throw AuthenticationError;
    },
    removeReview: async (parent, { reviewId }, context) => {
      if (context.user) {
        const review = await Review.findByIdAndDelete(reviewId)
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedReviews: { reviewId } } },
          { new: true }
        );
        return review;
      }
      throw AuthenticationError;
    },
  },
};

module.exports = resolvers;
