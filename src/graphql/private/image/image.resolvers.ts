/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { PERMISSIONS, ROL } from '@interfaces/index';
import { authMiddleware, hasPermission, hasRol } from '@middlewares/access';
import { imageRepository } from '@repositories/repository';

export const ImageResolvers = {
  Query: {
    getAllOnwerImage: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.READ)(async (parent, args, context) => {
          const { alias } = context.user;

          return imageRepository.getAllWithOption({
            source: alias
          });
        })
      )
    )
  }
};
