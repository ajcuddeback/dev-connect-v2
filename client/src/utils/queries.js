import gql from "graphql-tag";

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
`;

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
`;

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
`;

export const OWNER_GROUPS = gql`
  query {
    myGroups {
      id
      group_title
      group_url
    }
  }
`;

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
`;

export const QUERY_PRODUCTS = gql`
  query {
    allProducts {
      id
      price
      product_name
      imgPath
      quantity
      category {
        id
        category_name
      }
    }
  }
`;
export const QUERY_CHECKOUT = gql`
  query getCheckout($amount: Int!) {
    checkout(amount: $amount) {
      session
    }
  }
`;

export const QUERY_CATEGORIES = gql`
  query {
    categories {
      id
      category_name
    }
  }
`;
export const QUERY_USER = gql`
  {
    user {
      firstName
      lastName
      orders {
        id
        purchase_date
        products {
          id
          product_name
          price
          quantity
          imgPath
        }
      }
    }
  }
`;

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
            username
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
                    createdAt
                    user_id
                    user{
                        id
                        username
                    }
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

export const GET_POSTS = gql`
query {
        posts {
            id
            post_content
            user{
              id
              username
            }
            comments{
                id
                comment_text
            }
            
            liked_posts{
                	
                  id 
                  username
                                
            }
        }
}
`
export const COMMENT_BY_POST = gql`
    query commentsByPost($post_id: Int!){
        commentsByPost(post_id:$post_id) {
            id
            comment_text
            user {
                username
            }
        }
    }
`

export const GET_POST_BY_ID = gql`
    query {
        getPostById {
            id 
            post_content
        }
    }


`


export const QUERY_PRODUCT = gql`
  query($id: Int!) {
    product(id: $id) {
      id
      product_name
      price
      quantity
      imgPath
      category {
        category_name
      }
    }
  }
`;

