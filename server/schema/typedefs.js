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
    }

    type Group {
        id: ID 
        group_title: String 
        group_text: String 
        group_zip: Int 
        user_id: Int
        user_count: Int
        events: [Event]
    }

    type Event {
        id: ID 
        event_title: String 
        event_text: String
        event_location: String 
        event_time: String 
        group_id: Int
        users: Int
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
        users: [User] #done
        myGroups: [Group] #done
        groups: [Group] #done
        events: Event 
        group(group_id: Int!): Group #done
        event(event_id: Int!): Event
        groupByZip(group_zip: Int!, miles: Int!): [Group] #done
    }

    type Mutation {
        login(username: String!, password: String!): Auth #done
        addUser(username: String!, email: String!, first_name: String!, last_name: String!, password: String!): Auth #done
        deleteUser(userId: Int): User
        createGroup(group_title: String!, group_text: String!, group_zip: Int!): Group #done
        addUserGroup(group_id: Int!): Group #done
        updateGroup(group_id: Int!, group_title: String, group_text: String, group_zip: Int): Group #done
        deleteGroup(group_id: Int!): Group #done
        createEvent(input: EventInput): Event #done
        addUserEvent(event_id: Int!): Event #done
        updateEvent(event_id: Int!, event_title: String, event_text: String, event_location: String, event_time: String): Event #done
        deleteEvent(event_id: Int!): Event
    }
`

module.exports = typeDefs;