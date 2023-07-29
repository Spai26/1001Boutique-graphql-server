/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  authAttachPermission,
  authDeletePermission,
  authUpdatePermission
} from '@controllers/auth';
import { PERMISSIONS, ROL } from '@interfaces/types/type.custom';

import { permissionRepository } from '@repositories/repository';
import { authMiddleware, hasPermission, hasRol } from '@middlewares/access';
import {
  handlerHttpError,
  typesErrors
} from '@middlewares/handlerErrorsApollo';

export const PermissionResolvers = {
  Query: {
    getAllPermision: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.READ)((parent, args, context) => {
          return permissionRepository
            .getAll()
            .then((data) => {
              if (data) {
                return data;
              }
              return [];
            })
            .catch((error) => {
              throw handlerHttpError(
                `Error fn: allpermission ${error}`,
                typesErrors.DATABASE_ERROR
              );
            });
        })
      )
    )
  },
  Mutation: {
    createNewPermission: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.CREATE)(
          async (parent, { input }, context) => {
            const newPermission = await authAttachPermission(input);
            return newPermission;
          }
        )
      )
    ),
    updateOnePermission: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.UPDATE)(
          async (parent, { input }, context) => {
            const updatePermission = await authUpdatePermission(input);
            return updatePermission;
          }
        )
      )
    ),

    deletePermissionWithRelation: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.DELETE)(async (parent, { id }, context) => {
          return authDeletePermission(id);
        })
      )
    )
  }
};
