/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { IRol } from '@interfaces/rol.interface';
import { getModelByName } from '@helpers/querys/generalConsult';
import {
  attachUserInDB,
  deleteWithAllRelations,
  getUserForId,
  updateControllerUser
} from '@controllers/auth/auth.user.controller';
import {
  hasRol,
  hasPermission,
  authMiddleware
} from '@middlewares/access/index';
import { PERMISSIONS, ROL } from '@interfaces/types/type.custom';

const user = getModelByName('user');
export const UserResolvers = {
  Query: {
    getAllUsers: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.READ)(async (parent, args, context) => {
          const allUser = await user.find({}).populate<{ rol: IRol }>({
            path: 'rol',
            populate: {
              path: 'permissions'
            }
          });
          return allUser;
        })
      )
    ),

    searchUserforEmail: async (parent, { email }) => {
      const userByid = await getUserForId(email);
      return userByid;
    }
  },

  Mutation: {
    createUser: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.CREATE)(
          async (parent, { input }, context) => {
            const newUser = await attachUserInDB(input);
            return newUser;
          }
        )
      )
    ),

    updateUser: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.UPDATE)(
          async (parent, { input }, context) => {
            const updateUser = await updateControllerUser(input);
            return updateUser;
          }
        )
      )
    ),

    // eliminar los blogs relacionados por terminar
    deletedUser: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.DELETE)(async (parent, { id }, context) => {
          return deleteWithAllRelations(id);
        })
      )
    )
  }
};
