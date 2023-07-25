/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  attachInDB,
  deleteInDB,
  updateNameWithSlugInDB
} from '@controllers/auth';

import { PERMISSIONS, ROL } from '@interfaces/index';
import { authMiddleware, hasPermission, hasRol } from '@middlewares/access';

export const CategoryResolvers = {
  Mutation: {
    newCategory: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.CREATE)((parent, { input }, context) => {
          return attachInDB('category', input);
        })
      )
    ),
    updatedCategory: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.UPDATE)((parent, { input }, context) => {
          return updateNameWithSlugInDB('category', input);
        })
      )
    ),
    deletedCategory: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.DELETE)((parent, { id }, context) => {
          return deleteInDB('category', id);
        })
      )
    )
  }
};
