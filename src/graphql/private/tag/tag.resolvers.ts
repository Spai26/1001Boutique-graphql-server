/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { PERMISSIONS, ROL } from '@interfaces/index';
import { authMiddleware, hasPermission, hasRol } from '@middlewares/access';
import {
  handlerHttpError,
  typesErrors
} from '@middlewares/handlerErrorsApollo';
import { tagRepository } from '@repositories/repository';

export const TagResolvers = {
  Mutation: {
    newTag: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.CREATE)((parent, { input }, context) => {
          return tagRepository
            .create(input)
            .then((data) => {
              if (data) {
                return {
                  message: 'tagg add',
                  success: !!data,
                  result: data
                };
              }
              return null;
            })
            .catch((error) => {
              throw handlerHttpError(
                `Error fn: crete tag ${error}`,
                typesErrors.DATABASE_ERROR
              );
            });
        })
      )
    ),
    updateTag: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.UPDATE)((parent, { input }, context) => {
          const { id, name } = input;
          return tagRepository
            .update(id, name)
            .then((data) => {
              if (data) {
                return {
                  message: 'name update!',
                  success: !!data,
                  result: data
                };
              }
              return null;
            })
            .catch((error) => {
              throw handlerHttpError(
                `Error fn: update Permission ${error}`,
                typesErrors.DATABASE_ERROR
              );
            });
        })
      )
    ),

    deleteTag: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.DELETE)((parent, { id }, context) => {
          return tagRepository
            .delete(id)
            .then((data) => {
              if (data) {
                return {
                  message: `tag with ${data.name} deleted`,
                  success: !!data,
                  result: data
                };
              }
              return null;
            })
            .catch((error) => {
              throw handlerHttpError(
                `Error fn: delete Permission ${error}`,
                typesErrors.DATABASE_ERROR
              );
            });
        })
      )
    )
  }
};
