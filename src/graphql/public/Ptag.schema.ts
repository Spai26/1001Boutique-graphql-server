import { searchByRegex, showlist } from '@helpers/querys/generalConsult';
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
      const list = await showlist('tag');
      return list;
    },
    searchTagByName: async (_, { text }) => {
      const tag = await searchByRegex('tag', 'name', text);
      return tag;
    }
  }
};
