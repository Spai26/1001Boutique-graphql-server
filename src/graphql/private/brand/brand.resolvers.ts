/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  hasRol,
  hasPermission,
  authMiddleware
} from '@middlewares/access/index';
import { PERMISSIONS, ROL } from '@interfaces/types/type.custom';

import {
  createNewBrandDocument,
  updateBrandimages
} from '@controllers/auth/auth.brand.controller';
import { getModelByName } from '@helpers/querys/generalConsult';
import { generateSlug } from '@utils/textManipulation';

const Brand = getModelByName('brand');
export const BrandResolvers = {
  Query: {
    getAllOnwerBrand: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.READ)(async (parent, args, context) => {
          const allBrands = await Brand.find({})
            .populate('onwer')
            .populate('logo')
            .populate('gallery');
          return allBrands;
        })
      )
    ),
    getDetailOnwer: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.READ)(async (parent, { id }, context) => {
          const detailBrand = await Brand.findById(id)
            .populate('onwer')
            .populate('logo')
            .populate('gallery');
          return detailBrand;
        })
      )
    )
  },

  Mutation: {
    attachNewBrand: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.CREATE)(
          async (parent, { input }, context) => {
            return createNewBrandDocument(input, context);
          }
        )
      )
    ),

    updateMyBrand: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.UPDATE)(async (parent, args, context) => {
          const { id } = args;
          const { title, ...resBrand } = args.input;

          const updateBrand = await Brand.findByIdAndUpdate(id, {
            title,
            slug: generateSlug(title),
            ...resBrand
          });
          return {
            message: 'brand updated!',
            success: !!updateBrand
          };
        })
      )
    ),
    updateImagesOnBrand: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.UPDATE)(async (parent, args, context) => {
          const updateBrand = await updateBrandimages(args);
          return updateBrand;
        })
      )
    ),

    // eliminar los blogs relacionados por terminar
    deleteMyBrand: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.DELETE)(async (parent, { id }, context) => {
          return 'delet';
        })
      )
    )
  }
};
