/* eslint-disable no-underscore-dangle */

import { addBlogToArray } from '@helpers/querys';
import { IBlog, ICtx, ResponseModel, ResponseResult } from '@interfaces/index';
import {
  handlerHttpError,
  typesErrors
} from '@middlewares/handlerErrorsApollo';
import { BlogModel, ImageModel } from '@models/nosql';
import { BlogRepository, ImageRepository } from '@repositories/repository';
import { generateSlug } from '@utils/textManipulation';
import { Types } from 'mongoose';

const Blog = new BlogRepository(BlogModel);
const Image = new ImageRepository(ImageModel);
export const getLisBlogsCreated = async (ctx: ICtx): Promise<IBlog[]> => {
  const { id } = ctx.user;

  try {
    return await Blog.getBlogAuthor(id);
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

    const newImage = await Image.create({
      url,
      model_type,
      model_id: null,
      source: alias
    });

    const newBlog = await Blog.create({
      front_image: newImage._id,
      author: new Types.ObjectId(id),
      origin: alias,
      ...restdata
    });

    newImage.model_id = newBlog._id;
    newImage.save();

    await addBlogToArray(ctx, newBlog._id);

    return {
      message: 'Blog created!',
      success: !!newBlog && !!newImage,
      blog: newBlog
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
    const result = await Blog.getById(id);
    console.log(result);
    if (blogs.includes(result._id)) {
      return result;
    }

    return {
      message: 'blog does not exist or is incorrect',
      success: false
    };
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
    const updateData = await Blog.update(id, {
      title,
      body_content,
      status,
      slug_title: generateSlug(title)
    });

    return {
      message: 'Blog fields updated!',
      success: !!updateData,
      blog: updateData
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
    const blog = await Blog.getByIdWithPopulate(id);
    result = blog.front_image;

    if (result && result.url !== url) {
      const image = await Image.getById(result._id);
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
    result = await Blog.update(id, { status });

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
    const blogExist = await Blog.getById(id);

    if (!blogExist) {
      throw handlerHttpError(
        'Blog with id does not exist',
        typesErrors.NOT_FOUND
      );
    }

    imageDelete = Blog.delete(id).then((blogDelete) => {
      if (blogDelete) {
        Image.deleteOne({ model_id: blogExist._id }).catch((error) => {
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
