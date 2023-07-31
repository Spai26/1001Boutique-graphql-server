import { storeRepository } from '@repositories/repository';
import gql from 'graphql-tag';

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
      const listStore = await storeRepository.getAllWithPopulation();
      return listStore;
    },
    getStoreDetail: async (parent, { id }) => {
      const storeview = await storeRepository.getByIdPopulate(id);
      return storeview;
    },

    searchStoreBytitle: async (parent, args) => {
      const search = await storeRepository.searchBlogByField(
        'title',
        args.title
      );
      return search;
    }
  }
};
