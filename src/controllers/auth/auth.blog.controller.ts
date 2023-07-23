import { generateDocImage } from '@helpers/querys/Image.query';

import {
  createNewDocument,
  getModelByName
} from '@helpers/querys/generalConsult';
import {
  IBlogDocument,
  ICtx,
  ResponseResult,
  listModel
} from '@interfaces/index';
import {
  handlerHttpError,
  typesErrors
} from '@middlewares/handlerErrorsApollo';
import { ImageModel } from '@models/nosql';
import { generateSlug } from '@utils/funcitonHelpers';

let blog = getModelByName('blog');
let image = getModelByName('image');

let updateData = null;
let imageUpdate = null;
/**
 * @param ctx
 * @returns
 */
export const showListBlogCtr = async (ctx): Promise<IBlogDocument[]> => {
  const { id } = ctx.user;
  //falta considerar origin or source
  try {
    return await blog
      .find({ author: id }, { virtual: true })
      .populate('front_image')
      .populate('author');
  } catch (error) {
    throw handlerHttpError(
      `Error in list blog auth function: ${error}`,
      typesErrors.DATABASE_ERROR
    );
  }
};

/**
 *
 * @param id
 * @returns
 */
export const detailBlogCtr = async (id): Promise<IBlogDocument> => {
  const dataBlog = await blog
    .findById(id)
    .populate('front_image')
    .populate('author');

  if (!dataBlog) {
    throw handlerHttpError(`Blog dont fount`, typesErrors.NOT_FOUND);
  }

  return dataBlog;
};

/**
 * *This function update all fields for document blog
 * @param values
 * @param modelname
 * @returns
 */

export const updateBlogCtr = async (values): Promise<ResponseResult> => {
  const { id } = values;
  const { title, body_content, status } = values.input;

  try {
    updateData = await blog.findByIdAndUpdate(id, {
      title,
      body_content,
      status,
      slug_title: generateSlug(title)
    });

    return {
      message: 'Blog fields updated!',
      success: !!updateData
    };
  } catch (error) {
    throw handlerHttpError(
      `Error in update Blog auth function: ${error}`,
      typesErrors.DATABASE_ERROR
    );
  }
};

export const updateBlogImageCtr = async (values): Promise<ResponseResult> => {
  const { id } = values;
  const { url } = values.input;

  try {
    //depliego la relacion con image
    const existBlog = await blog.findById(id).populate('front_image');

    //verifico si ingresa un url
    if (existBlog.front_image.url !== url) {
      //busco por model y actualizo
      imageUpdate = await image.findOneAndUpdate(
        { model_id: existBlog._id },
        { url }
      );
    }

    return {
      message: 'Blog Image updated!',
      success: !!imageUpdate
    };
  } catch (error) {
    throw handlerHttpError(
      `Error in update Image Blog auth function: ${error}`,
      typesErrors.DATABASE_ERROR
    );
  }
};

export const updateStatusBlogCtr = async (values): Promise<ResponseResult> => {
  //solo actualiza status

  const { id, status } = values;

  try {
    updateData = await blog.findByIdAndUpdate(id, { status });

    return {
      message: 'Blog status updated!',
      success: true
    };
  } catch (error) {
    throw handlerHttpError(
      `Error in updateStatus Blog auth function: ${error}`,
      typesErrors.DATABASE_ERROR
    );
  }
};

/**
 * *  the function is to attach a single image to a blog post and save it in the database
 * @param values
 * @param context
 * @param modelname
 * @returns
 */
export const attachInDBwithSingleImage = async (
  values: any,
  ctx: ICtx,
  modelname: keyof listModel
): Promise<ResponseResult> => {
  const { id, alias } = ctx.user;
  const { title, body_content, front_image, status } = values;
  const { url, model_type } = front_image;

  try {
    //generate model_id
    const image = await generateDocImage({
      url,
      model_type,
      model_id: null,
      source: alias
    });

    //model_id reference blog._id

    const newvalue = await createNewDocument(
      {
        title,
        body_content,
        status,
        front_image: image._id,
        author: id,
        origin: alias
      },
      modelname
    );

    image.model_id = newvalue._id;

    await Promise.all([image.save(), newvalue.save()]);
    //save document on db

    return {
      message: 'Blog created!',
      success: true
    };
  } catch (error) {
    throw handlerHttpError(
      `Error in attach Blog auth function: ${error}`,
      typesErrors.DATABASE_ERROR
    );
  }
};

/**
 *
 * @param id
 * @returns
 */
export const deleteBlogCtr = async (id): Promise<ResponseResult> => {
  let imageDelete = null;
  try {
    //extrae el id de la imagen y eliminarla
    const blogExist = await blog.findById(id);

    if (!blogExist) {
      throw handlerHttpError(
        `Blog with id does not exist`,
        typesErrors.NOT_FOUND
      );
    }

    const blogDelete = await blog.deleteOne({ _id: id });
    //delete image
    if (blogDelete.deletedCount > 0) {
      imageDelete = await ImageModel.deleteOne({
        model_id: blogExist._id
      });
    }

    return {
      message: `Blog ${blogExist.title} and image deleted!`,
      success: !!blogDelete && !!imageDelete
    };
  } catch (error) {
    throw handlerHttpError(
      `Error fn: delete blog :${error}`,
      typesErrors.BAD_REQUEST
    );
  }
};
