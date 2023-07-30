/* eslint-disable no-underscore-dangle */

import { addToArray } from '@helpers/querys';
import { IBlog, ICtx, ResponseModel, ResponseResult } from '@interfaces/index';
import {
  handlerHttpError,
  typesErrors
} from '@middlewares/handlerErrorsApollo';
import { blogRepository, imageRepository } from '@repositories/repository';
import { generateSlug } from '@utils/textManipulation';
import { Types } from 'mongoose';

export const getLisBlogsCreated = async (ctx: ICtx): Promise<IBlog[]> => {
  const { id } = ctx.user;

  try {
    return await blogRepository.getBlogAuthor(id);
  } catch (error) {
    throw handlerHttpError(
      `Error in list blog auth function: ${error}`,
      typesErrors.DATABASE_ERROR
    );
  }
};

export const createBlog = async (
  data,
  ctx: ICtx
): Promise<ResponseResult | ResponseModel> => {
  try {
    const { id, alias } = ctx.user;
    const { front_image, ...restdata } = data;
    const { url, model_type } = front_image;

    const newImage = await imageRepository.create({
      url,
      model_type,
      model_id: null,
      source: alias
    });

    const newBlog = await blogRepository.create({
      front_image: newImage._id,
      author: new Types.ObjectId(id),
      origin: alias,
      ...restdata
    });

    newImage.model_id = newBlog._id;
    newImage.save();

    await addToArray(ctx, newBlog._id, 'blogs');

    return {
      message: 'Blog created!',
      success: !!newBlog && !!newImage,
      result: newBlog
    };
  } catch (error) {
    throw handlerHttpError(
      `Error created blog auth function: ${error}`,
      typesErrors.DATABASE_ERROR
    );
  }
};

export const detailBlog = async (
  id,
  ctx: ICtx
): Promise<IBlog | ResponseResult> => {
  const { blogs } = ctx.user;

  try {
    const result = await blogRepository.getById(id);

    if (!blogs.includes(result._id)) {
      throw handlerHttpError(
        'you blog dont autorization',
        typesErrors.UNAUTHORIZED
      );
    }

    return result;
  } catch (error) {
    throw handlerHttpError(
      `Error detail blog auth function: ${error}`,
      typesErrors.DATABASE_ERROR
    );
  }
};

export const updateFieldTextBlog = async (
  values
): Promise<ResponseResult | ResponseModel> => {
  const { id } = values;
  const { title, body_content, status } = values.input;

  try {
    const updateData = await blogRepository.update(id, {
      title,
      body_content,
      status,
      slug_title: generateSlug(title)
    });

    return {
      message: 'Blog fields updated!',
      success: !!updateData,
      result: updateData
    };
  } catch (error) {
    throw handlerHttpError(
      `Error in update Blog auth function: ${error}`,
      typesErrors.DATABASE_ERROR
    );
  }
};

export const updateFieldImageInBlog = async (
  values
): Promise<ResponseResult> => {
  const { id } = values;
  const { url } = values.input;
  let result;
  try {
    const blog = await blogRepository.getByIdWithPopulate(id);
    result = blog.front_image;

    if (result && result.url !== url) {
      const image = await imageRepository.getById(result._id);
      if (image) {
        image.url = url;
        result = await image.save();
      }
    }

    return {
      message: `Blog ${blog.title} Image updated!`,
      success: !!result
    };
  } catch (error) {
    throw handlerHttpError(
      `Error in updateImage Blog auth function: ${error}`,
      typesErrors.DATABASE_ERROR
    );
  }
};

export const updateFieldStatusBlog = async (
  values
): Promise<ResponseResult> => {
  let result;
  const { id, status } = values;

  try {
    result = await blogRepository.update(id, { status });

    return {
      message: 'Blog status updated!',
      success: !!result
    };
  } catch (error) {
    throw handlerHttpError(
      `Error in updateStatus Blog auth function: ${error}`,
      typesErrors.DATABASE_ERROR
    );
  }
};

export const deleteBlog = async (
  id
): Promise<ResponseResult | ResponseModel> => {
  let imageDelete = null;
  try {
    const blogExist = await blogRepository.getById(id);

    if (!blogExist) {
      throw handlerHttpError(
        'Blog with id does not exist',
        typesErrors.NOT_FOUND
      );
    }

    imageDelete = blogRepository.delete(id).then((blogDelete) => {
      if (blogDelete) {
        imageRepository
          .deleteOne({ model_id: blogExist._id })
          .catch((error) => {
            throw handlerHttpError(
              `Error fn: delete blog image: ${error}`,
              typesErrors.BAD_REQUEST
            );
          });
      }
    });

    return {
      message: `Blog ${blogExist.title} and image deleted!`,
      success: !!imageDelete
    };
  } catch (error) {
    throw handlerHttpError(
      `Error fn: delete blog :${error}`,
      typesErrors.BAD_REQUEST
    );
  }
};
