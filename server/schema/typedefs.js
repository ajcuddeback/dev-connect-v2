const { gql } = require("apollo-server-express");

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
    orders: [Order]
  }

  type Group {
    id: ID
    group_title: String
    group_url: String
    group_text: String
    group_zip: Int
    user_id: Int
    users_count: Int
    events: [Event]
    group_user: [User]
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
  type Category {
    id: ID
    category_name: String
  }

  type Product {
    id: ID
    product_name: String
    imgPath: String
    price: Int
    quantity: Int

    category: Category
  }

  type Order {
    id: ID
    user_id: Int
    purchase_date: String
    products: [Product]
  }

  type Query {
    me: User #done
    users: [User] #done
    myGroups: [Group] #done
    groups: [Group] #done
    events: [Event] #done
    group(group_url: String!): Group #done
    event(event_id: Int!): Event #done
    groupByZip(group_zip: Int!, miles: Int!): [Group] #done
    categories: [Category]

    product(id: Int!): Product
    order(id: Int!): Order
    orders: [Order]
    allProducts: [Product]
  }

  type Mutation {
    login(username: String!, password: String!): Auth #done
    addUser(
      username: String!
      email: String!
      first_name: String!
      last_name: String!
      password: String!
    ): Auth #done
    createGroup(
      group_title: String!
      group_url: String!
      group_text: String!
      group_zip: Int!
    ): Group #done
    addUserGroup(group_id: Int!): Group #done
    updateGroup(
      group_id: Int!
      group_title: String
      group_text: String
      group_zip: Int
    ): Group #done
    deleteGroup(group_id: Int!): Group #done
    createEvent(input: EventInput): Event #done
    addUserEvent(event_id: Int!): Event #done
    updateEvent(
      event_id: Int!
      event_title: String
      event_text: String
      event_location: String
      event_time: String
    ): Event #done
    deleteEvent(event_id: Int!): Event #done
    addOrder(product_id: Int!): Order
    updateProduct(id: Int!, quantity: Int!): Product
  }
`;

module.exports = typeDefs;
