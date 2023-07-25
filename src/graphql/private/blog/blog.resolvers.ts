/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { authMiddleware, hasPermission, hasRol } from '@middlewares/access';
import { PERMISSIONS, ROL } from '@interfaces/types/type.custom';
import {
  attachInDBwithSingleImage,
  deleteBlogCtr,
  detailBlogCtr,
  showListBlogCtr,
  updateBlogCtr,
  updateBlogImageCtr,
  updateStatusBlogCtr
} from '@controllers/auth/auth.blog.controller';

export const BlogResolvers = {
  Query: {
    getAllOnwerBlogs: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.READ)((parent, args, context) => {
          return showListBlogCtr(context);
        })
      )
    ),
    getBlogbyIdOnwer: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.READ)(async (parent, { id }, context) => {
          return detailBlogCtr(id);
        })
      )
    )
  },
  Mutation: {
    newBlog: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.CREATE)(
          async (parent, { input }, context) => {
            return attachInDBwithSingleImage(input, context, 'blog');
          }
        )
      )
    ),
    updateMyBlog: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.UPDATE)(async (parent, args, context) => {
          return updateBlogCtr(args);
        })
      )
    ),
    updateBlogImage: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.UPDATE)(async (parent, args, context) => {
          return updateBlogImageCtr(args);
        })
      )
    ),
    updateStatusBlog: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.UPDATE)((parent, args, context) => {
          return updateStatusBlogCtr(args);
        })
      )
    ),

    deleteMyBlog: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.DELETE)((parent, { id }, context) => {
          return deleteBlogCtr(id);
        })
      )
    )
  }
};
