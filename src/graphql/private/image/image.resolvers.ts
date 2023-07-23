import { showlist } from '@helpers/querys/generalConsult';
import { IImage, PERMISSIONS, ROL } from '@interfaces/index';
import { authMiddleware, hasPermission, hasRol } from '@middlewares/access';

export const ImageResolvers = {
  Query: {
    getAllOnwerImage: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.READ)(
          async (_, __, context): Promise<IImage[]> => {
            const { alias } = context.user;

            return await showlist('image', {
              source: alias,
              model_type: 'IMAGE'
            });
          }
        )
      )
    ),
    getAllOnwerGallery: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.READ)(
          async (_, __, context): Promise<IImage[]> => {
            const { alias } = context.user;

            return await showlist('image', {
              source: alias,
              model_type: 'GALLERY'
            });
          }
        )
      )
    )
  }
  /*   Mutation: {
    emptyField: (_, args) => {
      return 'hello';
    }
    updateImage: async (_, args) => {
      const { id } = args;
      const { url } = args.input;

      const data = await ImageModel.findByIdAndUpdate(
        id,
        { url },
        { new: true }
      );

      return {
        message: 'Image updated!',
        success: !!data
      };
    }
  } */
};
