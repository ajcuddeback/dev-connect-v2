const { gql } = require('apollo-server-express');

const typeDefs = gql` 

    input GroupInput {
        group_title: String! 
        group_text: String! 
        group_zip: String! 
        user_id: Int!
    }

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
        group: [Group]
        group_user: [Group_User]
        event_user: [Event_User]
    }

    type Group {
        id: ID 
        group_title: String 
        group_text: String 
        group_zip: Int 
        user_id: Int
        users: Int
        event: [Event]
    }

    type Event {
        id: ID 
        event_title: String 
        event_text: String
        event_location: String 
        event_time: String 
        group_id: Int
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

    type Query {
        me: User #done
        users: [User]
        groups: Group 
        events: Event 
        group(group_id: Int!): Group 
        event(event_id: Int!): Event
        groupByZip(group_zip: Int!): Group 

    }

    type Mutation {
        login(username: String!, password: String!): Auth #done
        addUser(username: String!, email: String!, first_name: String!, last_name: String!, password: String!): Auth #done
        deleteUser(userId: Int): User
        createGroup(input: GroupInput): Group 
        addUserGroup(group_id: Int!): Group 
        updateGroup(group_id: Int!, group_title: String, group_text: String, group_zip: Int): Group 
        deleteGroup(group_id: Int!): Group
        createEvent(input: EventInput): Event 
        updateEvent(event_id: Int!, event_title: String, event_text: String, event_location: String, event_time: String): Event 
        deleteEvent(event_id: Int!): Event
    }
`

module.exports = typeDefs;