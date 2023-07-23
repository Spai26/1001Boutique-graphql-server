import gql from 'graphql-tag';

export const PermissionTypeDefs = gql`
  extend type Query {
    getAllPermision: [Permision]
  }

  extend type Mutation {
    #nameorDescInput ref: schema
    createNewPermission(input: NameOrDescInput): Response
    updateOnePermission(input: NameAndDescPatchInput!): Response
    deletePermissionWithRelation(id: [ID!]!): Response
  }

  type SearchCategory {
    name: String!
  }

  type Permision {
    id: ID
    name: String
    description: String
  }
`;
