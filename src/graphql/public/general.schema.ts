import gql from 'graphql-tag';

export const GeneralTypeDefs = gql`
  #search global
  type Query {
    _: String
  }
  #message global
  type Response {
    success: Boolean
    message: String
  }

  #input for tag/category/permission/rol
  input NameOrDescInput {
    name: String!
    description: String
  }

  input NameAndDescPatchInput {
    id: ID!
    name: String!
    description: String
  }
`;
