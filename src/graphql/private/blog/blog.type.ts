import gql from 'graphql-tag';

export const BlogTypeDefs = gql`
  extend type Query {
    #para evitar errores
    getAllOnwerBlogs: [Blog]
    getBlogbyIdOnwer(id: ID!): Blog
  }
  extend type Mutation {
    newBlog(input: blogCreationInput): Response
    updateMyBlog(id: ID!, input: blogUpdateInput!): Response
    updateStatusBlog(id: ID!, status: Boolean!): Response
    updateBlogImage(id: ID!, input: ImageUpdateInput): Response
    deleteMyBlog(id: ID!): Response
  }

  type SearchBlog {
    title: String!
  }

  #model Blog
  type Blog {
    id: ID
    title: String!
    body_content: String!
    front_image: Image!
    slug_title: String #autogenerate
    count_view: Int
    author: PUser! #dont change
    status: Boolean
    origin: String #dont change
    createdAt: String
    updatedAt: String
  }

  type PBlog {
    id: ID
    title: String
    body_content: String
    front_image: PImage
    slug_title: String
    count_view: Int
    author: PUser
    createdAt: String
    updatedAt: String
  }

  #slug / origin / author autogenerate
  input blogCreationInput {
    title: String
    body_content: String
    front_image: ImageInput
    status: Boolean
  }

  input blogUpdateInput {
    title: String
    body_content: String
    front_image: ImageUpdateInput
    status: Boolean
  }
`;
