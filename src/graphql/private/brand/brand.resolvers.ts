/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  hasRol,
  hasPermission,
  authMiddleware
} from '@middlewares/access/index';
import { PERMISSIONS, ROL } from '@interfaces/types/type.custom';
import { brandRepository } from '@repositories/repository';
import {
  createBrand,
  detailBrand,
  updateImagesBrand,
  updateTextBrand
} from '@controllers/brand';

export const BrandResolvers = {
  Query: {
    getAllOnwerBrand: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.READ)(async (parent, args, context) => {
          const allBrands = await brandRepository.getAllWithPopulation();
          return allBrands;
        })
      )
    ),
    getBrandbyIdOnwer: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.READ)(async (parent, { id }, context) => {
          // TODO: trabajarlo igual que blog
          return detailBrand(id, context);
        })
      )
    )
  },

  Mutation: {
    attachNewBrand: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.CREATE)((parent, { input }, context) => {
          return createBrand(context, input);
        })
      )
    ),

    updateMyBrand: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.UPDATE)((parent, args, context) => {
          return updateTextBrand(args);
        })
      )
    ),
    updateImagesOnBrand: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.UPDATE)(async (parent, args, context) => {
          return updateImagesBrand(args);
        })
      )
    ),

    deleteMyBrand: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.DELETE)(async (parent, { id }, context) => {
          return 'delet';
        })
      )
    )
  }
};
