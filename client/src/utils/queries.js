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