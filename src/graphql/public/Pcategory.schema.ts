import { searchByRegex, showlist } from '@helpers/querys';
import gql from 'graphql-tag';

export const PCategoryTypeDefs = gql`
  extend type Query {
    getAllCategory: [Category]
    searchCategoryByName: [Category]
  }
`;

export const PCategoryResolvers = {
  Query: {
    getAllCategory: () => {
      return showlist('category');
    },
    searchCategoryByName: async (_, { text }) => {
      const category = await searchByRegex('category', 'name', text);
      return category;
    }
  }
};
