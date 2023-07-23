import {
  handlerHttpError,
  typesErrors
} from '@middlewares/handlerErrorsApollo';

export const authMiddleware = (next) => (parent, args, context, info) => {
  if (!context.user) {
    throw handlerHttpError('dont have access!', typesErrors.UNAUTHENTIFATED);
  }
  return next(parent, args, context, info);
};
