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
      const listStore = await store
        .find({})
        .populate('onwer')
        .populate('gallery')
        .populate('main_image')
        .populate('logo')
        .populate('tags')
        .populate('categories');
      return listStore;
    },
    getStoreDetail: async (parent, { id }) => {
      const storeview = await store
        .findById(id)
        .populate('onwer')
        .populate('gallery')
        .populate('main_image')
        .populate('logo')
        .populate('tags')
        .populate('categories');
      return storeview;
    },

    searchStoreBytitle: async (parent, args) => {
      const search = await searchByRegex('store', 'title', args.title);
      return search;
    }
  }
};
