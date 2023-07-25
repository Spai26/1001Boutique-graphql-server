import { isExistById } from '@helpers/querys/generalConsult';
import { keys } from '@config/variables';
import { ROL } from '@interfaces/types/type.custom';
import {
  handlerHttpError,
  typesErrors
} from '@middlewares/handlerErrorsApollo';

export const hasRol =
  (allowenRoles) => (next) => async (parent, args, context, info) => {
    const { rol } = context.user;
    const currentRol = await isExistById(rol, 'rol');

    const currentAccess =
      allowenRoles.includes(ROL.ROOT) && currentRol.name === keys.ROOTROL;

    if (allowenRoles.includes(currentRol.name) || currentAccess) {
      return next(parent, args, context, info);
    }

    throw handlerHttpError(
      'You dont have Rol valid for request!',
      typesErrors.UNAUTHORIZED
    );
  };
