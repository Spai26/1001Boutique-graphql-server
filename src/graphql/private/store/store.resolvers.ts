/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  createNewStoreDocument,
  deleteStoreCtr,
  updateStoreImages
} from '@controllers/auth/auth.store.controller';
import { getModelByName } from '@helpers/querys';
import { PERMISSIONS, ROL } from '@interfaces/index';

import { authMiddleware, hasPermission, hasRol } from '@middlewares/access';
import { generateSlug } from '@utils/textManipulation';

const store = getModelByName('store');
export const StoreResolvers = {
  Query: {
    getAllOnwerStore: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.READ)(async (parent, args, context) => {
          const { id } = context.user;

          const data = store
            .find({ onwer: id })
            .populate('logo')
            .populate('onwer')
            .populate('tags')
            .populate('categories')
            .populate('main_image')
            .populate('gallery');

          return data;
        })
      )
    ),
    getDetailStore: async () => {
      return 'hello';
    }
  },
  Mutation: {
    attachNewStore: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.CREATE)(
          async (parent, { input }, context) => {
            return createNewStoreDocument(input, context);
          }
        )
      )
    ),
    updateMyStore: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.UPDATE)(async (parent, args, context) => {
          const { id } = args;
          const { title, ...resInput } = args.input;

          const update = await store.findByIdAndUpdate(id, {
            title,
            slug: generateSlug(title),
            ...resInput
          });
          return update;
        })
      )
    ),

    updateAnyImageOnStore: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.UPDATE)(async (parent, args, context) => {
          const updateImages = await updateStoreImages(args);
          return updateImages;
        })
      )
    ),
    deleteMyStore: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.DELETE)(async (parent, { id }, context) => {
          const deleteImages = await deleteStoreCtr(id);
          return deleteImages;
        })
      )
    )
  }
};
