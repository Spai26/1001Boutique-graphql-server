import { tagRepository } from '@repositories/repository';
import gql from 'graphql-tag';

export const PTagTypeDefs = gql`
  extend type Query {
    getAllTags: [Tag]
    searchTagByName: [Tag]
  }
`;

export const PTagResolvers = {
  Query: {
    getAllTags: async () => {
      const list = tagRepository.getAll();
      return list;
    },
    searchTagByName: async (_, { text }) => {
      const tag = tagRepository.searchByField('name', text);
      return tag;
    }
  }
};
