// resolvers
const { User, Question } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    // get & read requests
    Query: {
        // all questions starting w/ most recent
        questions: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Question.find(params).sort({ createdAt: -1 });
        },

        // finds a single question
        question: async (parent, { _id }) => {
            return Question.findOne({ _id });
        },

    },

    // create, update, delete requests
    Mutation: {

        addQuestion: async (parent, args, context) => {
            if (context.user) {
              const question = await Question.create({ ...args, username: context.user.username });
          
              await User.findByIdAndUpdate(
                { _id: context.user._id },
                { $push: { questions: question._id } },
                { new: true }
              );
          
              return question;
            }
          
            throw new AuthenticationError('You need to be logged in!');
        },

        addAnswer: async (parent, { questionId, answerBody }, context) => {
            if (context.user) {
              const updatedQuestion = await Question.findOneAndUpdate(
                { _id: questionId },
                { $push: { answers: { answerBody, username: context.user.username } } },
                { new: true, runValidators: true }
              );
          
              return updatedQuestion;
            }
          
            throw new AuthenticationError('You need to be logged in!');
        },

        addFriend: async (parent, { friendId }, context) => {
            if (context.user) {
              const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { friends: friendId } },
                { new: true }
              ).populate('friends');
          
              return updatedUser;
            }
          
            throw new AuthenticationError('You need to be logged in!');
        }
    }
}

module.exports = resolvers;
