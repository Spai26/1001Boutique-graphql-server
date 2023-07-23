import { keys } from '@config/variables';
import { isExistById } from '@helpers/querys/generalConsult';
import {
  handlerHttpError,
  typesErrors
} from '@middlewares/handlerErrorsApollo';

export const hasPermission =
  (allowenPermission: string) =>
  (next) =>
  async (parent, args, context, info) => {
    let currentAccess;
    let currentPermission;
    const { rol } = context.user;
    const currentRol = await isExistById(rol, 'rol', 'permissions');

    if (currentRol.name === keys.ROOTROL) {
      return next(parent, args, context, info);
    }

    currentPermission = currentRol.permissions.map((p) => p.name);

    if ((currentAccess = currentPermission.includes(allowenPermission))) {
      return next(parent, args, context, info);
    }

    throw handlerHttpError(
      'You dont have Permission for this operation!',
      typesErrors.UNAUTHORIZED
    );
  };
