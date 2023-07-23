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
        hasPermission(PERMISSIONS.READ)((_, __, context) => {
          return showListBlogCtr(context);
        })
      )
    ),
    getBlogbyIdOnwer: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.READ)(async (_, { id }, context) => {
          return detailBlogCtr(id);
        })
      )
    )
  },
  Mutation: {
    newBlog: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.CREATE)(
          async (_: any, { input }, context) => {
            return attachInDBwithSingleImage(input, context, 'blog');
          }
        )
      )
    ),
    updateMyBlog: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.UPDATE)(async (_: any, args, context) => {
          return updateBlogCtr(args);
        })
      )
    ),
    updateBlogImage: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.UPDATE)(async (_: any, args, context) => {
          return updateBlogImageCtr(args);
        })
      )
    ),
    updateStatusBlog: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.UPDATE)((_: any, args, context) => {
          return updateStatusBlogCtr(args);
        })
      )
    ),

    deleteMyBlog: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.DELETE)((_: any, { id }, context) => {
          return deleteBlogCtr(id);
        })
      )
    )
  }
};
