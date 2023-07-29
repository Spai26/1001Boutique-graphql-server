/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { authMiddleware, hasPermission, hasRol } from '@middlewares/access';
import { PERMISSIONS, ROL } from '@interfaces/types/type.custom';
import {
  createBlog,
  deleteBlog,
  detailBlog,
  getLisBlogsCreated,
  updateFieldImageInBlog,
  updateFieldStatusBlog,
  updateFieldTextBlog
} from '@controllers/blog';

export const BlogResolvers = {
  Query: {
    getAllOnwerBlogs: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.READ)((parent, args, context) => {
          return getLisBlogsCreated(context);
        })
      )
    ),
    getBlogbyIdOnwer: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.READ)((parent, { id }, context) => {
          return detailBlog(id, context);
        })
      )
    )
  },
  Mutation: {
    attachNewBlog: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.CREATE)(
          async (parent, { input }, context) => {
            return createBlog(input, context);
          }
        )
      )
    ),
    updateMyBlog: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.UPDATE)((parent, args, context) => {
          return updateFieldTextBlog(args);
        })
      )
    ),
    updateBlogImage: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.UPDATE)((parent, args, context) => {
          return updateFieldImageInBlog(args);
        })
      )
    ),
    updateStatusBlog: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.UPDATE)((parent, args, context) => {
          return updateFieldStatusBlog(args);
        })
      )
    ),

    deleteMyBlog: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.DELETE)((parent, { id }, context) => {
          return deleteBlog(id);
        })
      )
    )
  }
};
