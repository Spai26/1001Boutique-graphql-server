/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
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
        hasPermission(PERMISSIONS.CREATE)((parent, { input }, context) => {
          return attachInDB('tag', input);
        })
      )
    ),
    updateTag: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.UPDATE)((parent, { input }, context) => {
          return updateNameWithSlugInDB('tag', input);
        })
      )
    ),

    deleteTag: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.DELETE)((parent, { id }, context) => {
          return deleteInDB('tag', id);
        })
      )
    )
  }
};
