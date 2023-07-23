import cloudinary from '@libs/cloudinary';
import {
  handlerHttpError,
  typesErrors
} from '@middlewares/handlerErrorsApollo';

export const uploadImage = async (path: string): Promise<string> => {
  try {
    const { secure_url } = await cloudinary.uploader.upload(path);
    //const image = `${result.public_id}.${result.format}`;
    return secure_url;
    //return image;
  } catch (error) {
    throw handlerHttpError(
      'Error cloudinary dont upload image.!',
      typesErrors.INTERNAL_SERVER_ERROR
    );
  }
};
