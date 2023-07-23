import { incrementViewAndFetchBlogById } from '@controllers/public/PController';
import { getModelByName } from '@helpers/querys';
import { IBlogDocument } from '@interfaces/index';

import gql from 'graphql-tag';

export const PBlogTypeDefs = gql`
  extend type Query {
    getpublicBlogs: [PBlog]
    getOneBlogbyId(id: ID!): PBlog
    searchByTitle(title: String!): [PBlog]
  }
`;
const blog = getModelByName('blog');

export const PBlogResolvers = {
  Query: {
    getpublicBlogs: async (): Promise<IBlogDocument[]> => {
      return await blog
        .find({}, { virtual: true })
        .populate('author')
        .populate('front_image');
    },
    getOneBlogbyId: async (_: any, args): Promise<IBlogDocument> => {
      //count view
      return await incrementViewAndFetchBlogById('blog', args);
    },
    searchByTitle: async (_: any, { title }): Promise<IBlogDocument[]> => {
      return await blog
        .find({ title: { $regex: title, $options: 'i' } })
        .populate('author')
        .populate('front_image');
    }
  }
};
