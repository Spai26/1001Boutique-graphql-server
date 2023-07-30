/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  createStore,
  deleteStore,
  detailStore,
  updateImageStore,
  updateTextStore
} from '@controllers/store';
import { PERMISSIONS, ROL } from '@interfaces/index';
import { authMiddleware, hasPermission, hasRol } from '@middlewares/access';
import { storeRepository } from '@repositories/repository';

export const StoreResolvers = {
  Query: {
    getAllOnwerStore: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.READ)(async (parent, args, context) => {
          const { id } = context.user;
          return storeRepository.getAllWithPopulationOnwer(id);
        })
      )
    ),
    getStorebyIdOnwer: async (parent, { id }, context) => {
      return detailStore(id, context);
    }
  },
  Mutation: {
    attachNewStore: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.CREATE)(
          async (parent, { input }, context) => {
            return createStore(input, context);
          }
        )
      )
    ),
    updateMyStore: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.UPDATE)(async (parent, args, context) => {
          return updateTextStore(args);
        })
      )
    ),

    updateAnyImageOnStore: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.UPDATE)(async (parent, args, context) => {
          return updateImageStore(args);
        })
      )
    ),
    deleteMyStore: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.DELETE)(async (parent, { id }, context) => {
          return deleteStore(id);
        })
      )
    )
  }
};
