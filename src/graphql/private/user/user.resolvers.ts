/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  createControllerUser,
  deleteWithAllRelations,
  updateControllerUser
} from '@controllers/auth';
import {
  hasRol,
  hasPermission,
  authMiddleware
} from '@middlewares/access/index';
import { PERMISSIONS, ROL } from '@interfaces/types/type.custom';
import {
  handlerHttpError,
  typesErrors
} from '@middlewares/handlerErrorsApollo';
import { userRepository } from '@repositories/repository';

export const UserResolvers = {
  Query: {
    getAllUsers: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.READ)((parent, args, context) => {
          return userRepository
            .populateWithSubDocument()
            .then((data) => {
              return data;
            })
            .catch((error) => {
              throw handlerHttpError(
                `Error fn: allUser ${error}`,
                typesErrors.DATABASE_ERROR
              );
            });
        })
      )
    ),

    searchUserforEmail: (parent, { email }) => {
      return userRepository
        .getByOne({ email })
        .then((data) => {
          return data;
        })
        .catch((error) => {
          throw handlerHttpError(
            `Error fn: searchUser ${error}`,
            typesErrors.DATABASE_ERROR
          );
        });
    }
  },

  Mutation: {
    attachNewUser: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.CREATE)((parent, { input }, context) => {
          return createControllerUser(input);
        })
      )
    ),

    updateUser: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.UPDATE)((parent, { input }, context) => {
          return updateControllerUser(input);
        })
      )
    ),

    // eliminar los blogs relacionados por terminar
    deletedUser: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.DELETE)((parent, { id }, context) => {
          return deleteWithAllRelations(id);
        })
      )
    )
  }
};
