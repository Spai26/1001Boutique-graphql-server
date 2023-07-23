import gql from 'graphql-tag';

export const RolTypeDefs = gql`
  extend type Query {
    getAllroles: [Rol]
  }

  extend type Mutation {
    updateArrayRolesWithPermissions(input: [arrayUpdateFields!]!): Response
    deleteRoles(id: ID!): Response
  }

  type Rol {
    id: ID
    name: String!
    description: String
    permissions: [Permision]
  }

  # solo aceptara ID existentes
  input arrayUpdateFields {
    id: ID!
    name: String
    description: String
    permissions: [ID]
  }
`;
