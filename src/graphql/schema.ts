import gql from 'graphql-tag';

/**
 * * Private routes graphql
 */
import {
  UserResolvers,
  UserTypeDefs,
  RolResolvers,
  RolTypeDefs,
  PermissionTypeDefs,
  PermissionResolvers,
  CategoryResolvers,
  CategoryTypeDefs,
  TagTypeDefs,
  TagResolvers,
  BlogResolvers,
  BlogTypeDefs,
  StoreResolvers,
  StoreTypeDefs,
  BrandTypeDefs,
  BrandResolvers,
  //
  ImageResolvers,
  ImageTypeDefs
} from './private';

/**
 * * Public routes graphql
 */
import { AuthTypeDefs, AuthResolvers } from './auth';
import {
  PCategoryTypeDefs,
  PCategoryResolvers,
  PTagTypeDefs,
  PTagResolvers,
  GeneralTypeDefs,
  PBlogTypeDefs,
  PBlogResolvers,
  PStoreTypeDefs,
  PStoreResolvers,
  PBrandTypeDefs,
  PBrandResolvers
} from './public';

const rootTypeDefs = gql`
  type Query {
    _: String
  }

  type Mutation {
    _: String
  }
`;

export const typeDefs = [
  rootTypeDefs,
  AuthTypeDefs,
  UserTypeDefs,
  RolTypeDefs,
  PermissionTypeDefs,
  CategoryTypeDefs,
  TagTypeDefs,
  BlogTypeDefs,
  StoreTypeDefs,
  BrandTypeDefs,
  //
  ImageTypeDefs,
  //
  PCategoryTypeDefs,
  PTagTypeDefs,
  PBlogTypeDefs,
  GeneralTypeDefs,
  PStoreTypeDefs,
  PBrandTypeDefs
];

export const resolvers = [
  AuthResolvers,
  UserResolvers,
  RolResolvers,
  PermissionResolvers,
  CategoryResolvers,
  TagResolvers,
  BlogResolvers,
  StoreResolvers,
  BrandResolvers,
  //
  ImageResolvers,
  //
  PCategoryResolvers,
  PTagResolvers,
  PBlogResolvers,
  PStoreResolvers,
  PBrandResolvers
];
