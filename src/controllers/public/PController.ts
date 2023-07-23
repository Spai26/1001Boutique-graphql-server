import {
  getModelByName,
  incrementViewModelbyId
} from '@helpers/querys/generalConsult';
import { listModel } from '@interfaces/index';
import {
  handlerHttpError,
  typesErrors
} from '@middlewares/handlerErrorsApollo';

/**
 * * the function is to increment the count_view field of a document in a MongoDB database by 1
 * @param modelName
 * @param values
 * @returns
 */
export const incrementViewAndFetchBlogById = async (
  modelName: keyof listModel,
  values: { id: string }
) => {
  const { id } = values;
  const model = getModelByName(modelName);
  try {
    const update = await incrementViewModelbyId(modelName, id);

    if (update.modifiedCount) {
      return await model
        .findById(id)
        .populate('author')
        .populate('front_image');
    }
  } catch (error) {
    handlerHttpError(
      `Error inc view for id ${error}`,
      typesErrors.DATABASE_ERROR
    );
  }
};
