import gql from 'graphql-tag';

export const LOGIN_USER = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            token
            user {
                id
                username
            }
        }
    }
`

export const SIGNUP_USER = gql`
    mutation addUser ($username: String!, $email: String!, $first_name: String!, $last_name: String!, $password: String!) {
        addUser(username: $username, email: $email, first_name: $first_name, last_name: $last_name, password: $password) {
            token
            user {
                id
                username
            }
        }
    }
`

export const ADD_USER_GROUP = gql`
    mutation addUserGroup($group_id: Int!) {
        addUserGroup(group_id: $group_id) {
            id
            group_title
        }
    }
`

export const ADD_USER_EVENT = gql`
    mutation addUserEvent($event_id: Int!) {
        addUserEvent(event_id: $event_id) {
            id
            event_title
        }
    }
`