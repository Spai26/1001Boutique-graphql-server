import gql from 'graphql-tag';

export const TagTypeDefs = gql`
  type Query {
    #para evitar errores
    _: String
  }
  extend type Mutation {
    #nameorDescInput ref: generalSchema
    newTag(input: NameOrDescInput): Response
    updateTag(input: NameAndDescPatchInput): Response
    deleteTag(id: ID!): Response
  }

  type SearchTag {
    nameTag: String!
  }

  type Tag {
    id: ID
    name: String
    slug: String
  }
`;
