/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  authDeleteRoles,
  updateRolesAndPermission
} from '@controllers/auth/auth.rol.controller';

import { showListwithRelation } from '@helpers/querys/generalConsult';
import { authMiddleware, hasPermission, hasRol } from '@middlewares/access';
import { PERMISSIONS, ROL } from '@interfaces/types/type.custom';

export const RolResolvers = {
  Query: {
    getAllroles: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.READ)((parent, args, context) => {
          return showListwithRelation('rol', 'permissions');
        })
      )
    )
  },

  Mutation: {
    updateArrayRolesWithPermissions: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.UPDATE)(
          async (parent, { input }, context) => {
            const updateRoles = await updateRolesAndPermission(input);
            return updateRoles;
          }
        )
      )
    ),

    deleteRoles: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.DELETE)(async (parent, { id }, context) => {
          const deletedRol = await authDeleteRoles(id);
          return deletedRol;
        })
      )
    )
  }
};
