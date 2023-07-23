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
import { generateSlug } from '@utils/funcitonHelpers';

const Brand = getModelByName('brand');
export const BrandResolvers = {
  Query: {
    getAllOnwerBrand: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.READ)(async (_, __, context) => {
          return await Brand.find({})
            .populate('onwer')
            .populate('logo')
            .populate('gallery');
        })
      )
    ),
    getDetailOnwer: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.READ)(async (_, { id }, context) => {
          return await Brand.findById(id)
            .populate('onwer')
            .populate('logo')
            .populate('gallery');
        })
      )
    )
  },

  Mutation: {
    attachNewBrand: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.CREATE)(
          async (_: any, { input }: any, context: any) => {
            return createNewBrandDocument(input, context);
          }
        )
      )
    ),

    updateMyBrand: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.UPDATE)(
          async (_: any, args: any, context) => {
            const { id } = args;
            const { title, ...resBrand } = args.input;

            const updateBrand = await Brand.findByIdAndUpdate(id, {
              title,
              slug: generateSlug(title),
              ...resBrand
            });
            return {
              message: 'brand updated!',
              success: true
            };
          }
        )
      )
    ),
    updateImagesOnBrand: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.UPDATE)(
          async (_: any, args: any, context) => {
            return await updateBrandimages(args);
          }
        )
      )
    ),

    //eliminar los blogs relacionados por terminar
    deleteMyBrand: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.DELETE)(async (_: any, { id }, context) => {
          return 'delet';
        })
      )
    )
  }
};
