/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { authDeleteRoles, updateRolesAndPermission } from '@controllers/auth';
import { authMiddleware, hasPermission, hasRol } from '@middlewares/access';
import { PERMISSIONS, ROL } from '@interfaces/types/type.custom';
import { rolRepository } from '@repositories/repository';
import {
  handlerHttpError,
  typesErrors
} from '@middlewares/handlerErrorsApollo';

export const RolResolvers = {
  Query: {
    getAllroles: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.READ)((parent, args, context) => {
          return rolRepository
            .getRolWithPopulation()
            .then((data) => {
              if (data) {
                return data;
              }
              return [];
            })
            .catch((error) => {
              throw handlerHttpError(
                `Error fn: allRol ${error}`,
                typesErrors.DATABASE_ERROR
              );
            });
        })
      )
    )
  },

  Mutation: {
    updateArrayRolesWithPermissions: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.UPDATE)((parent, { input }, context) => {
          return updateRolesAndPermission(input);
        })
      )
    ),

    deleteRoles: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.DELETE)((parent, { id }, context) => {
          return authDeleteRoles(id);
        })
      )
    )
  }
};
