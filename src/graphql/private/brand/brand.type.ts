import gql from 'graphql-tag';

export const BrandTypeDefs = gql`
  #Query consult list
  extend type Query {
    getAllOnwerBrand: [Brand]
    getBrandbyIdOnwer(id: ID!): Brand
  }

  #Mutation list
  extend type Mutation {
    attachNewBrand(input: brandCreationInput): BrandResponse
    updateMyBrand(id: ID!, input: brandUpdateInput): BrandResponse
    updateImagesOnBrand(id: ID!, input: brandUpdateImageInput): BrandResponse
    deleteMyBrand(id: ID!): BrandResponse
  }

  #Base model Brand
  type Brand {
    id: ID
    title: String
    sub_title: String
    slug: String
    biografy: String
    short_biografy: String
    logo: Image
    gallery: [Image]
    collections: String
    count_view: String
    onwer: PUser
    createdAt: String
    updatedAt: String
  }

  type PBrand {
    id: ID
    title: String
    sub_title: String
    slug: String
    biografy: String
    short_biografy: String
    logo: PImage
    gallery: [PImage]
    collections: String
    count_view: String
    onwer: PUser
    createdAt: String
    updatedAt: String
  }

  #fields necesary for create Brand
  input brandCreationInput {
    title: String
    sub_title: String
    biografy: String
    short_biografy: String
    logo: ImageInput
    gallery: [ImageInput]
    collections: String
  }

  #fields for update one Brand
  input brandUpdateInput {
    title: String
    sub_title: String
    biografy: String
    short_biografy: String
    collections: String
  }

  input brandUpdateImageInput {
    logo: ImageUpdateInput
    gallery: [ImageUpdateInput]
  }

  type BrandResponse {
    message: String
    success: Boolean
    result: Brand
  }
`;
