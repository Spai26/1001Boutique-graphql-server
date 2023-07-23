import gql from 'graphql-tag';

export const UserTypeDefs = gql`
  #Query consult list
  extend type Query {
    getAllUsers: [User]
    #por evaluar
    searchUserforEmail(email: String!): User
  }

  #Mutation list
  extend type Mutation {
    createUser(input: createNewUser): Response
    updateUser(input: updateuserExist): Response
    changePassword(password: String!): Response
    deletedUser(id: ID!): String
  }

  #Base model User
  type User {
    id: ID
    firstname: String
    lastname: String
    email: String
    username: String
    phone: String
    website: String
    password: String
    photo: String
    rol: Rol
    branchs: [Store] #
    stores: String #
    createdAt: String
    updatedAt: String
  }

  #Public user
  type PUser {
    id: ID
    username: String
  }

  #fields necesary for create user
  input createNewUser {
    firstname: String
    lastname: String
    password: String
    email: String
    username: String
    rol: ID!
  }

  #fields for update one user
  input updateuserExist {
    id: ID!
    firstname: String
    lastname: String
    phone: String
    website: String
    rol: ID
  }
`;
