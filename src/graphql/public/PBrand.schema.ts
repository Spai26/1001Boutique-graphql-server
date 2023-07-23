/* searchBrandByTitle:  */
import { getModelByName, searchByRegex } from '@helpers/querys/generalConsult';
import gql from 'graphql-tag';

const brand = getModelByName('brand');

export const PBrandTypeDefs = gql`
  extend type Query {
    getAllBrand: [PBrand]
    getBrandDetail(id: ID!): PBrand
    searchBrandBytitle(title: String!): [PBrand]
  }
`;

export const PBrandResolvers = {
  Query: {
    getAllStore: async () => {
      return await brand
        .find({})
        .populate('onwer')
        .populate('gallery')
        .populate('logo');
    },
    getStoreDetail: async (_, { id }) => {
      return await brand
        .findById(id)
        .populate('onwer')
        .populate('gallery')
        .populate('logo');
    },

    searchStoreBytitle: async (_, args) => {
      const store = await searchByRegex('brand', 'title', args.title);
      return store;
    }
  }
};
