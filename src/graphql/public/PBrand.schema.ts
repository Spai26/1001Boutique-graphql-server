/* searchBrandByTitle:  */

import {
  handlerHttpError,
  typesErrors
} from '@middlewares/handlerErrorsApollo';
import { brandRepository } from '@repositories/repository';
import gql from 'graphql-tag';

export const PBrandTypeDefs = gql`
  extend type Query {
    getAllBrand: [PBrand]
    getBrandDetail(id: ID!): PBrand
    searchBrandBytitle(title: String!): [PBrand]
  }
`;

export const PBrandResolvers = {
  Query: {
    getAllBrand: async () => {
      const listBrand = await brandRepository.getAllWithPopulation();
      return listBrand;
    },
    getBrandDetail: async (parent, { id }) => {
      const countViewBrand = await brandRepository
        .incrementViewField(id)
        .then((data) => {
          if (!data) {
            throw handlerHttpError('Brand missing', typesErrors.BAD_REQUEST);
          }
          return data;
        })
        .catch((error) => {
          throw handlerHttpError(
            `Brand missing: ${error}`,
            typesErrors.DATABASE_ERROR
          );
        });

      return countViewBrand;
    },

    searchBrandBytitle: async (_, args) => {
      const { title } = args;
      const brand = await brandRepository
        .searchBrandByField('title', title)
        .then((data) => {
          if (!data) {
            throw handlerHttpError(
              'Brand with this title missing',
              typesErrors.BAD_REQUEST
            );
          }
          return data;
        })
        .catch((error) => {
          throw handlerHttpError(
            `Brand missing: ${error}`,
            typesErrors.DATABASE_ERROR
          );
        });

      return brand;
    }
  }
};
