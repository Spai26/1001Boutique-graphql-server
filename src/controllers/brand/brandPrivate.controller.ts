/* eslint-disable no-underscore-dangle */
import { addToArray } from '@helpers/querys';
import { IBrand, ICtx, ResponseModel } from '@interfaces/index';
import {
  handlerHttpError,
  typesErrors
} from '@middlewares/handlerErrorsApollo';
import { brandRepository, imageRepository } from '@repositories/repository';
import { generateSlug } from '@utils/textManipulation';

export const createBrand = async (
  context,
  input
): Promise<IBrand | ResponseModel> => {
  const { alias, id } = context.user;
  const { logo, gallery, ...resInputBrand } = input;
  try {
    // generate document image
    const [Dlogo, Dgallery] = await Promise.all([
      imageRepository.generateSingleImage({ logo, source: alias }),
      imageRepository.generateArrayImages({
        gallery,
        source: alias
      })
    ]);

    // genero un array de id
    const arrayGallery = Dgallery.map((item) => {
      return item._id;
    });

    const newBrand = await brandRepository.create({
      logo: Dlogo._id,
      gallery: arrayGallery,
      onwer: id,
      ...resInputBrand // all another fields
    });

    Dlogo.model_id = newBrand._id;

    Dgallery.forEach((element) => {
      const modified = { ...element };
      modified.model_id = newBrand._id;
    });

    // guardamos el doc en bd
    const result = await Promise.all([
      Dlogo.save(),
      ...Dgallery.map((doc) => doc.save()),
      newBrand.save()
    ]);

    // TODO: add brand listarray user
    await addToArray(context, newBrand._id, 'brands');

    return {
      message: `Brand with title ${newBrand.title} created!`,
      success: !!result,
      result: newBrand
    };
  } catch (error) {
    throw handlerHttpError(
      `Error creating brand, ${error}`,
      typesErrors.DATABASE_ERROR
    );
  }
};

export const updateTextBrand = async (args): Promise<ResponseModel> => {
  const { id } = args;
  const { title, ...resBrand } = args.input;
  try {
    const exist = await brandRepository.getById(id);

    if (!exist) {
      throw handlerHttpError(
        `this ${id} is not valid`,
        typesErrors.DATABASE_ERROR
      );
    }

    const updateBrand = await brandRepository.update(id, {
      title,
      slug: generateSlug(title),
      ...resBrand
    });
    if (updateBrand) {
      return {
        message: `Brand with last title ${exist.title} updated a ${updateBrand.title}!`,
        success: !!updateBrand,
        result: updateBrand
      };
    }

    return null;
  } catch (error) {
    throw handlerHttpError(
      `Error update text Brand document, ${error}`,
      typesErrors.DATABASE_ERROR
    );
  }
};

export const updateImagesBrand = async (args): Promise<ResponseModel> => {
  const { id } = args;
  const { logo, gallery } = args.input;
  try {
    const exist = await brandRepository.getById(id);

    if (!exist) {
      throw handlerHttpError(
        `this ${id} is not valid`,
        typesErrors.BAD_REQUEST
      );
    }

    if (exist.logo || exist.logo === null) {
      // TODO:busca por el objectId
      const { url, _id } = await imageRepository.getById(exist.logo.toString());
      if (url !== logo.url) {
        await imageRepository.update(_id, { url: logo.url });
      }
    }
    if (exist.gallery || exist.gallery === null) {
      exist.gallery.map(async (imageObjectId, i) => {
        const galleryItem = gallery[i];
        // TODO:busca por el objectId
        const { _id, url } = await imageRepository.getById(
          imageObjectId.toString()
        );
        if (url !== galleryItem.url) {
          await imageRepository.update(_id, { url: galleryItem.url });
        }
      });
    }
    return {
      message: 'Campos de imagen actualizado',
      success: true
    };
  } catch (error) {
    throw handlerHttpError(
      `Error update images brand document, ${error}`,
      typesErrors.DATABASE_ERROR
    );
  }
};

export const detailBrand = async (id, ctx: ICtx): Promise<IBrand> => {
  const { brands } = ctx.user;
  try {
    const result = await brandRepository.getById(id);

    if (!brands.includes(result._id)) {
      throw handlerHttpError(
        'you brand dont autorization',
        typesErrors.UNAUTHORIZED
      );
    }
    return result;
  } catch (error) {
    throw handlerHttpError(
      `Error detail brand auth function: ${error}`,
      typesErrors.DATABASE_ERROR
    );
  }
};
