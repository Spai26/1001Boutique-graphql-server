import { getModelByName, searchByRegex } from '@helpers/querys/generalConsult';
import gql from 'graphql-tag';

const store = getModelByName('store');

export const PStoreTypeDefs = gql`
  extend type Query {
    getAllStore: [PStore]
    getStoreDetail(id: ID!): PStore
    searchStoreBytitle(title: String!): [PStore]
  }
`;

export const PStoreResolvers = {
  Query: {
    getAllStore: async () => {
      return await store
        .find({})
        .populate('onwer')
        .populate('gallery')
        .populate('main_image')
        .populate('logo')
        .populate('tags')
        .populate('categories');
    },
    getStoreDetail: async (_, { id }) => {
      return await store
        .findById(id)
        .populate('onwer')
        .populate('gallery')
        .populate('main_image')
        .populate('logo')
        .populate('tags')
        .populate('categories');
    },

    searchStoreBytitle: async (_, args) => {
      console.log(args);
      const store = await searchByRegex('store', 'title', args.title);
      return store;
    }
  }
};
