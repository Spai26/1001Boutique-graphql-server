import gql from 'graphql-tag';

export const StoreTypeDefs = gql`
  extend type Query {
    #para evitar errores
    getAllOnwerStore: [Store]
    getDetailStore(id: ID!): Store
  }

  extend type Mutation {
    attachNewStore(input: storeCreationInput): Response
    updateMyStore(id: ID!, input: storeUpdateInput): Response
    updateAnyImageOnStore(id: ID!, input: storeUpdateImageInput): Response
    deleteMyStore(id: ID!): Response
  }

  #Model schema
  type Store {
    id: ID
    title: String!
    sub_title: String
    slug: String
    description: String!
    main_image: Image!
    logo: Image
    phone: String
    address: String!
    positionX: String!
    positionY: String!
    region: String
    country: String
    url_website: String
    url_video: String
    email: String
    socials: [Social]
    times_tables: [Times]
    onwer: User
    status: Boolean
    tags: [Tag]
    gallery: [Image]
    categories: [Category]
    createdAt: String
    updatedAt: String
  }

  type PStore {
    id: ID
    title: String
    sub_title: String
    slug: String
    description: String
    main_image: PImage
    logo: PImage
    phone: String
    address: String
    positionX: String
    positionY: String
    region: String
    country: String
    url_website: String
    url_video: String
    email: String
    socials: [Social]
    times_tables: [Times]
    onwer: User
    tags: [Tag]
    gallery: [PImage]
    categories: [Category]
    createdAt: String
    updatedAt: String
  }

  type Social {
    name_social: String
    url: String
  }

  type Times {
    week_name: String
    open_time: String
    close_time: String
    open: Boolean
  }

  #owner autogenerate
  input storeCreationInput {
    title: String!
    sub_title: String!
    description: String!
    main_image: ImageInput!
    logo: ImageInput
    phone: String
    address: String!
    positionX: String!
    positionY: String!
    region: String
    country: String
    url_video: String
    url_website: String
    email: String
    socials: [SocialInput]
    times_tables: [TimesInput]
    gallery: [ImageInput]
    categories: [ID!]
    tags: [ID!]
  }

  input TimesInput {
    week_name: String
    open_time: String
    close_time: String
    open: Boolean
  }

  input SocialInput {
    name_social: String
    url: String
  }

  input storeUpdateInput {
    title: String
    sub_title: String
    description: String
    phone: String
    address: String
    positionX: String
    positionY: String
    region: String
    country: String
    url_video: String
    url_website: String
    email: String
    socials: [SocialInput]
    times_tables: [TimesInput]
    categories: [ID]
    tags: [ID]
  }

  input storeUpdateImageInput {
    main_image: ImageUpdateInput
    logo: ImageUpdateInput
    gallery: [ImageUpdateInput]
  }
`;
