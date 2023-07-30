import gql from 'graphql-tag';

export const TagTypeDefs = gql`
  type Query {
    #para evitar errores
    _: String
  }
  extend type Mutation {
    #nameorDescInput ref: generalSchema
    newTag(input: NameOrDescInput): TagResponse
    updateTag(input: NameAndDescPatchInput): TagResponse
    deleteTag(id: ID!): TagResponse
  }

  type SearchTag {
    nameTag: String!
  }

  type Tag {
    id: ID
    name: String
    slug: String
  }

  type TagResponse {
    message: String
    success: Boolean
    result: Tag
  }
`;
