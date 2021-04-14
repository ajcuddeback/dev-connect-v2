import gql from 'graphql-tag';

export const GROUPS_BY_ZIP = gql`
    query groupByZip($group_zip: Int!, $miles: Int!) {
        groupByZip(group_zip: $group_zip, miles: $miles) {
            id
            group_title
            group_url
            group_text
            group_zip
            users_count
        }
    }
`

export const GET_GROUP = gql`
    query group($group_url: String!) {
        group(group_url: $group_url) {
            id
            group_title
            group_text
            group_zip
            users_count
            events {
                id
                event_title
                event_text
                event_location
                event_time
                event_user {
                    id
                    username
                }
            }
            group_user {
                id
                first_name
            }
        }
    }
`

export const GET_ME_EVENTS = gql`
    query {
        me {
            id
            event_user {
                id
                event_title 
            }
        }
    }
`

export const OWNER_GROUPS = gql`
    query {
        myGroups {
            id
            group_title
            group_url
        }
    }
`

export const GET_ME_GROUPS = gql`
    query {
        me {
            id
            group_user {
                id
                group_title
                group_url
            }
        }
    }
`

// question and answer queries
export const GET_QUESTIONS = gql`
    query questions($username: String) {
        questions (username: $username) {
            id
            question_text
            createdAt
            user_id
            user{
                id
                username
            }
            answers {
                id
                answer_text
                createdAt
                user{
                    id
                    username
                }
            }
        }
    }
    
`

export const GET_ME_QUESTIONS = gql`
    query {
        me {
            id
            questions {
                id
                question_text
                createdAt
                user_id
                user{
                    id
                    username
                }
                answers {
                    id
                    answer_text
                    user_id
                    user{
                        id
                        username
                    }
                    createdAt
                }
            }
        }
    }
`

// friend queries
export const GET_ME_FRIENDS = gql`
    query {
        me {
            id
            username
            friends {
                id
                user_id
                username
            }
        }
    }
`