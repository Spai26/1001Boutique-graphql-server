import {
  attachInDB,
  deleteInDB,
  updateNameWithSlugInDB
} from '@controllers/auth';
import { PERMISSIONS, ROL } from '@interfaces/index';
import { authMiddleware, hasPermission, hasRol } from '@middlewares/access';

export const TagResolvers = {
  Mutation: {
    newTag: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.CREATE)((_, { input }, context) => {
          return attachInDB('tag', input);
        })
      )
    ),
    updateTag: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.UPDATE)((_: any, { input }, context) => {
          return updateNameWithSlugInDB('tag', input);
        })
      )
    ),

    deleteTag: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.DELETE)((_: any, { id }, context) => {
          return deleteInDB('tag', id);
        })
      )
    )
  }
};
