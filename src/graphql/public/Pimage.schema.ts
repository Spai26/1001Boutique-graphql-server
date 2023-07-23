import { showlist } from '@helpers/querys/generalConsult';
import gql from 'graphql-tag';

export const PImageTypeDefs = gql`
  extend type Query {
    getAllImageforPublic: string
  }
`;
export const PImageResolvers = {
  Query: {
    getAllImageforPublic: async () => {
      return 'show all image';
    }
  }
};
