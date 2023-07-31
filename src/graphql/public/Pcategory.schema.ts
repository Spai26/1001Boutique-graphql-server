import { categoryRepository } from '@repositories/repository';
import gql from 'graphql-tag';

export const PCategoryTypeDefs = gql`
  extend type Query {
    getAllCategory: [Category]
    searchCategoryByName: [Category]
  }
`;

export const PCategoryResolvers = {
  Query: {
    getAllCategory: async () => {
      return categoryRepository.getAll();
    },
    searchCategoryByName: async (_, { text }) => {
      const category = await categoryRepository.searchByField('name', text);
      return category;
    }
  }
};
