import { incrementViewAndFetchBlogById } from '@controllers/public/PController';
import { getModelByName } from '@helpers/querys';

import gql from 'graphql-tag';

export const PBlogTypeDefs = gql`
  extend type Query {
    getAllBlogs: [PBlog]
    getOneBlogbyId(id: ID!): PBlog
    searchByTitle(title: String!): [PBlog]
  }
`;
const blog = getModelByName('blog');

export const PBlogResolvers = {
  Query: {
    getAllBlogs: async () => {
      const listBlogs = await blog
        .find({})
        .populate('author')
        .populate('front_image');
      return listBlogs;
    },
    getOneBlogbyId: async (parent, args) => {
      const countView = await incrementViewAndFetchBlogById('blog', args);
      return countView;
    },
    searchByTitle: async (parent, { title }) => {
      const search = await blog
        .find({ title: { $regex: title, $options: 'i' } })
        .populate('author')
        .populate('front_image');
      return search;
    }
  }
};
