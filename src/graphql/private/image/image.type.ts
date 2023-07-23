import gql from 'graphql-tag';

export const ImageTypeDefs = gql`
  extend type Query {
    getAllOnwerImage: [Image]
    getAllOnwerGallery: [Image]
  }

  """
   extend type Mutation {
    emptyField: String
     updateImage(id: ID!, input: ImageUpdateInput): Response
  }
  """
  type Image {
    id: ID!
    url: String
    model_type: imageEnumTypes
    model_id: ID! #reference to models father
    source: String
  }

  type PImage {
    id: ID
    url: String
  }

  #reference IImage
  enum imageEnumTypes {
    GALLERY
    IMAGE
    LOGO
  }

  #model_id autogenerate when created
  input ImageInput {
    url: String!
    model_type: imageEnumTypes!
    source: String
  }

  input ImageUpdateInput {
    url: String
    model_id: ID
  }
`;
