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
    getAllBrand: async () => {
      const listBrand = await brand
        .find({})
        .populate('onwer')
        .populate('gallery')
        .populate('logo');
      return listBrand;
    },
    getBrandDetail: async (parent, { id }) => {
      const countViewBrand = await brand
        .findById(id)
        .populate('onwer')
        .populate('gallery')
        .populate('logo');
      return countViewBrand;
    },

    searchBrandBytitle: async (_, args) => {
      const store = await searchByRegex('brand', 'title', args.title);
      return store;
    }
  }
};
