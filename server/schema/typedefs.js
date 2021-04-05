const { gql } = require('apollo-server-express');

const typeDefs = gql` 
    type Question {
        _id: ID
        questionText: String
        createdAt: String
        username: String
        answerCount: Int
        answers: [Answer]
    }

    type Answer {
        _id: ID
        answerBody: String
        createdAt: String
        username: String
    }

    type Query {
        me: User
        users: [User]
        user(username: String!): User
        thoughts(username: String): [Thought]
        thought(_id: ID!): Thought
    }

    type Mutation {
        addQuestion(questionText: String!): Question
        addAnswer(questionId: ID!, answerBody: String!): Question
        addFriend(friendId: ID!): User
    }
`

module.exports = typeDefs;