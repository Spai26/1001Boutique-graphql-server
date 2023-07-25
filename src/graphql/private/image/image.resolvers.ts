/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { showlist } from '@helpers/querys/generalConsult';
import { IImage, PERMISSIONS, ROL } from '@interfaces/index';
import { authMiddleware, hasPermission, hasRol } from '@middlewares/access';

export const ImageResolvers = {
  Query: {
    getAllOnwerImage: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.READ)(
          async (parent, args, context): Promise<IImage[]> => {
            const { alias } = context.user;
            const listImages = await showlist('image', {
              source: alias,
              model_type: 'IMAGE'
            });

            return listImages;
          }
        )
      )
    ),
    getAllOnwerGallery: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.READ)(
          async (parent, args, context): Promise<IImage[]> => {
            const { alias } = context.user;
            const onwerListImage = await showlist('image', {
              source: alias,
              model_type: 'GALLERY'
            });
            return onwerListImage;
          }
        )
      )
    )
  }
};
