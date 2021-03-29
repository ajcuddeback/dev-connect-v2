const { gql } = require('apollo-server-express');

const typeDefs = gql` 
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
`

module.exports = typeDefs;