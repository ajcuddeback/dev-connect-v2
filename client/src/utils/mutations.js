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