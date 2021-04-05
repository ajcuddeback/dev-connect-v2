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

export const CREATE_GROUP = gql`
    mutation createGroup($group_title: String!, $group_url: String!, $group_text: String!, $group_zip: Int!) {
        createGroup(group_title: $group_title, group_url: $group_url, group_text: $group_text, group_zip: $group_zip) {
            id
            group_title
  }
}
`