const { User } = require('../models');
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
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw AuthenticationError;
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw AuthenticationError;
      }
      const token = signToken(user);
      return { token, user };
    },
    saveReview: async (parent, { reviewData }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { savedReviews: reviewData } },
          { new: true }
        );
        return updatedUser;
      }
      throw AuthenticationError;
    },
    editReview: async (parent, { reviewId }, context) => {
        if (context.user) {
            const updatedUser = await User.findOneAndUpdate(
                {_id: context.user._id },
                { $set: { "savedReviews.$[i].text": newReviewData.text,
                    },
                 },
                { arrayFilters: [{ "i._id": { $eq: reviewId } }], new: true }
            );
            return updatedUser;
        }
        throw AuthenticationError;
    },
    removeReview: async (parent, { reviewId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedReviews: { reviewId } } },
          { new: true }
        );
        return updatedUser;
      }
      throw AuthenticationError;
    },
  },
};

module.exports = resolvers;
