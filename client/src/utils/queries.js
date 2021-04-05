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
            events {
                id
                event_title
                event_text
                event_location
                event_time
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