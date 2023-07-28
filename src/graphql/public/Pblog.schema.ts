import {
  getBlogs,
  getDetailBlogbyId,
  getSearchByTitle
} from '@controllers/blog';

import gql from 'graphql-tag';

export const PBlogTypeDefs = gql`
  extend type Query {
    getAllBlogs: [PBlog]
    getDetailBlog(id: ID!): PBlog
    searchBlogByTitle(text: String!): [PBlog]
  }
`;

export const PBlogResolvers = {
  Query: {
    getAllBlogs: () => {
      return getBlogs();
    },
    getDetailBlog: (parent, args) => {
      return getDetailBlogbyId(args.id);
    },
    searchBlogByTitle: (parent, { text }) => {
      return getSearchByTitle(text);
    }
  }
};
