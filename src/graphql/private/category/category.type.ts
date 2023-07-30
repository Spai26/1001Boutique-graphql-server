import gql from 'graphql-tag';

export const CategoryTypeDefs = gql`
  extend type Query {
    _: String
  }

  extend type Mutation {
    _: String
    #nameorDescInput ref: generalSchema
    newCategory(input: NameOrDescInput): CategoryResponse
    updatedCategory(input: NameAndDescPatchInput): CategoryResponse
    deletedCategory(id: ID!): CategoryResponse
  }

  type Category {
    id: ID
    name: String!
    slug: String
  }

  type CategoryResponse {
    message: String
    success: Boolean
    result: Category
  }
`;
