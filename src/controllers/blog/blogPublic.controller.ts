import { IBlog } from '@interfaces/blog.interface';
import {
  handlerHttpError,
  typesErrors
} from '@middlewares/handlerErrorsApollo';

import { blogRepository } from '@repositories/repository';

export const getBlogs = async (): Promise<IBlog[]> => {
  try {
    const listBlogs = await blogRepository.getBlogWithPopulations();

    return listBlogs;
  } catch (error) {
    throw handlerHttpError(
      `Error in list blog function: ${error}`,
      typesErrors.DATABASE_ERROR
    );
  }
};

export const getDetailBlogbyId = async (id: string): Promise<IBlog> => {
  try {
    const countView = await blogRepository.incrementViewField(id);
    return countView;
  } catch (error) {
    throw handlerHttpError(
      `Error in detail blog function: ${error}`,
      typesErrors.DATABASE_ERROR
    );
  }
};

export const getSearchByTitle = async (text: string): Promise<IBlog[]> => {
  try {
    return await blogRepository.searchBlogByField('title', text);
  } catch (error) {
    throw handlerHttpError(
      `Error in search function: ${error}`,
      typesErrors.DATABASE_ERROR
    );
  }
};
