import { CategoryModel } from '@models/nosql/category.models';
import {
  handlerHttpError,
  typesErrors
} from '@middlewares/handlerErrorsApollo';

export const showCategory = async () => {
  try {
    const current = await CategoryModel.find({});

    return current;
  } catch (error) {
    throw handlerHttpError(
      `Error fn: showCategory ${error}`,
      typesErrors.DATABASE_ERROR
    );
  }
};
