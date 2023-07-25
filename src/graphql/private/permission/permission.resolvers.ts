/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  authAttachPermission,
  authDeletePermission,
  authUpdatePermission
} from '@controllers/auth/auth.permission.controller';
import { showlist } from '@helpers/querys/generalConsult';
import { authMiddleware, hasPermission, hasRol } from '@middlewares/access';
import { PERMISSIONS, ROL } from '@interfaces/types/type.custom';
import { IPermission } from '@interfaces/permission.interface';

export const PermissionResolvers = {
  Query: {
    getAllPermision: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.READ)(
          async (parent, args, context): Promise<IPermission[]> => {
            return showlist('permission');
          }
        )
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
