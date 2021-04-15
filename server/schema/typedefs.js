const { gql } = require('apollo-server-express');

const typeDefs = gql` 
    input EventInput {
        event_title: String! 
        event_text: String! 
        event_location: String! 
        event_time: String! 
        group_id: Int!
    }

    type User {
        id: ID 
        username: String
        email: String 
        first_name: String 
        last_name: String 
        group_user: [Group]
        event_user: [Event]
        questions: [Question]
        friends: [User]
    }

    type Group {
        id: ID 
        group_title: String 
        group_url: String
        group_text: String 
        group_zip: Int 
        user_id: Int
        users_count: Int
        events: [Event]
        group_user: [User]
    }

    type Event {
        id: ID 
        event_title: String 
        event_text: String
        event_location: String 
        event_time: String 
        group_id: Int
        users: Int
        event_user: [User]
    }

    type Event_User {
        id: ID 
        user_id: Int 
        event_id: Int 
    }

    type Group_User {
        id: ID
        user_id: Int 
        group_id: Int
    }

    type Auth {
        token: ID! 
        user: User
    }

    type Answer {
        id: ID
        answer_text: String
        createdAt: String
        user_id: Int
        question_id: Int
    }

    # Question and Answer Types
    type Question {
        id: ID
        question_text: String
        createdAt: String
        user_id: Int
        answers: [Answer]
    }

    # Friend Type

    type User_Friends {
        id: ID
        user_id: Int
        friend_id: Int
    }
    ################# Post Query #######################
    type Post {
        id: ID
        post_content: String
        user: User
        comments: [Comment]
        liked_posts: [User]
    }

    ################# Comment Query ###################
    type Comment {
        id: ID
        comment_text: String
        user: User
        posts: Post
    }

    type Query {
        me: User #done
        users: [User] #done
        myGroups: [Group] #done
        groups: [Group] #done
        events: [Event] #done
        group(group_url: String!): Group #done
        event(event_id: Int!): Event #done
        groupByZip(group_zip: Int!, miles: Int!): [Group] #done
        questions(username: String): [Question]
        question(_id: ID!): Question
        posts: [Post] #done
        commentsByPost(post_id: Int!): [Comment] #done
        getPostById: [Post] #done
    }


    type Mutation {
        login(username: String!, password: String!): Auth #done
        addUser(username: String!, email: String!, first_name: String!, last_name: String!, password: String!): Auth #done
        createGroup(group_title: String!, group_url: String! group_text: String!, group_zip: Int!): Group #done
        addUserGroup(group_id: Int!): Group #done
        updateGroup(group_id: Int!, group_title: String, group_text: String, group_zip: Int): Group #done
        deleteGroup(group_id: Int!): Group #done
        createEvent(input: EventInput): Event #done
        addUserEvent(event_id: Int!): Event #done
        updateEvent(event_id: Int!, event_title: String, event_text: String, event_location: String, event_time: String): Event #done
        deleteEvent(event_id: Int!): Event #done
        addQuestion(question_text: String!): Question
        updateQuestion(question_id: ID!, question_text: String!): Question
        addAnswer(question_id: ID!, answer_text: String!): Question
        deleteQuestion(question_id: Int!): Question
        addFriend(friend_id: Int!): User
        createPost(post_content: String!): Post! #done
        updatePost(post_content:String!, post_id: Int): Post #done
        deletePost(post_id:Int): Post! #done
        createComment(comment_text: String!, post_id: Int!): Comment! #done
        deleteComment(comment_id: Int!): Comment! #done
        addLike(post_id: Int!): Post #done
        removeLike(post_id: Int): Post #done
   
    }
`

module.exports = typeDefs;