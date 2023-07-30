/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { PERMISSIONS, ROL } from '@interfaces/index';
import { authMiddleware, hasPermission, hasRol } from '@middlewares/access';
import {
  handlerHttpError,
  typesErrors
} from '@middlewares/handlerErrorsApollo';
import { categoryRepository } from '@repositories/repository';
import { generateSlug } from '@utils/textManipulation';

export const CategoryResolvers = {
  Mutation: {
    newCategory: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.CREATE)((parent, { input }, context) => {
          return categoryRepository
            .create(input)
            .then((data) => {
              if (data) {
                return {
                  message: 'category add',
                  success: !!data,
                  result: data
                };
              }
              return null;
            })
            .catch((error) => {
              throw handlerHttpError(
                `Error fn: crete permission ${error}`,
                typesErrors.DATABASE_ERROR
              );
            });
        })
      )
    ),
    updatedCategory: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.UPDATE)((parent, { input }, context) => {
          const { id, name } = input;
          return categoryRepository
            .update(id, {
              name,
              slug: generateSlug(name)
            })
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
    deletedCategory: authMiddleware(
      hasRol([ROL.ADMIN, ROL.ROOT])(
        hasPermission(PERMISSIONS.DELETE)((parent, { id }, context) => {
          return categoryRepository
            .delete(id)
            .then((data) => {
              if (data) {
                return {
                  message: `category with ${data.name} deleted`,
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
