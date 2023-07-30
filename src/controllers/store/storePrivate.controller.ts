/* eslint-disable no-underscore-dangle */
import { addToArray } from '@helpers/querys';
import { ICtx } from '@interfaces/index';

import {
  handlerHttpError,
  typesErrors
} from '@middlewares/handlerErrorsApollo';
import { imageRepository, storeRepository } from '@repositories/repository';
import { generateSlug } from '@utils/textManipulation';

export const createStore = async (input, context) => {
  const { alias } = context.user;
  const { main_image, logo, gallery, title, ...resInput } = input;

  // TODO: Check if the title already exists
  const exist = await storeRepository.getByOne({ title });

  if (exist) {
    throw handlerHttpError(
      `Store ${exist.title} dont valid, already exist`,
      typesErrors.ALREADY_EXIST
    );
  }

  try {
    // generate document image
    const [Dlogo, Dportada, Dgallery] = await Promise.all([
      imageRepository.generateSingleImage({ logo, source: alias }),
      imageRepository.generateSingleImage({
        main_image,
        source: alias
      }),
      imageRepository.generateArrayImages({
        gallery,
        source: alias
      })
    ]);

    // genero un array de id
    const arrayGallery = Dgallery.map((item) => {
      return item._id;
    });

    const newStore = await storeRepository.create({
      main_image: Dportada._id,
      logo: Dlogo._id,
      gallery: arrayGallery,
      title,
      onwer: context.user.id,
      ...resInput // all another fields
    });

    // asignamos el modelo origen
    Dlogo.model_id = newStore._id;
    Dportada.model_id = newStore._id;
    Dgallery.forEach((element) => {
      const modified = { ...element };
      modified.model_id = newStore._id;
    });

    // guardamos el doc en bd
    const result = await Promise.all([
      Dlogo.save(),
      Dportada.save(),
      ...Dgallery.map((doc) => doc.save())
    ]);

    await addToArray(context, newStore._id, 'stores');

    return {
      message: `Store with title ${newStore.title}, created!`,
      success: !!result,
      result: newStore
    };
  } catch (error) {
    throw handlerHttpError(
      `Error creating store, ${error}`,
      typesErrors.DATABASE_ERROR
    );
  }
};

export const detailStore = async (id, context: ICtx) => {
  const { stores } = context.user;
  const result = await storeRepository.getById(id);

  if (!result) {
    throw handlerHttpError('Store Missing dont valid', typesErrors.BAD_REQUEST);
  }

  try {
    if (!stores.includes(result._id)) {
      throw handlerHttpError(
        'you Store dont autorization',
        typesErrors.UNAUTHORIZED
      );
    }
    return result;
  } catch (error) {
    throw handlerHttpError(
      `Error detail store document, ${error}`,
      typesErrors.DATABASE_ERROR
    );
  }
};

export const updateTextStore = async (args) => {
  const { id } = args;
  const { title, ...resInput } = args.input;

  const exist = await storeRepository.getById(id);

  if (!exist) {
    throw handlerHttpError('Store Missing dont valid', typesErrors.BAD_REQUEST);
  }

  try {
    const update = await storeRepository.update(id, {
      title,
      slug: generateSlug(title),
      ...resInput
    });
    return update;
  } catch (error) {
    throw handlerHttpError(
      `Error update text store document, ${error}`,
      typesErrors.DATABASE_ERROR
    );
  }
};

export const updateImageStore = async (values) => {
  const { id } = values;
  const { logo, main_image, gallery } = values.input;

  const store = await storeRepository.getById(id);

  if (!store) {
    throw handlerHttpError('Store Missing dont valid', typesErrors.BAD_REQUEST);
  }

  try {
    if (store.logo || store.logo === null) {
      const { url, _id } = await imageRepository.getById(store.logo.toString());
      if (url !== logo.url) {
        await imageRepository.update(_id, { url: logo.url });
      }
    }

    if (store.main_image || store.main_image === null) {
      const { url, _id } = await imageRepository.getById(
        store.main_image.toString()
      );
      if (url !== main_image.url) {
        await imageRepository.update(_id, { url: main_image.url });
      }
    }
    if (store.gallery || store.gallery === null) {
      store.gallery.map(async (imageObjectId, i) => {
        const galleryItem = gallery[i];

        const { _id, url } = await imageRepository.getById(
          imageObjectId.toString()
        );
        if (url !== galleryItem.url) {
          await imageRepository.update(_id, { url: galleryItem.url });
        }
      });
    }
    return {
      message: 'filed images update!',
      success: true,
      result: store
    };
  } catch (error) {
    throw handlerHttpError(
      `Error update images store document, ${error}`,
      typesErrors.DATABASE_ERROR
    );
  }
};

export const deleteStore = async (id) => {
  const store = await storeRepository.getById(id);

  if (!store) {
    throw handlerHttpError('Store Missing dont valid', typesErrors.BAD_REQUEST);
  }

  try {
    const storeDeleted = await storeRepository
      .deleteOne({ _id: id })
      .then((deleted) => {
        if (deleted.deletedCount > 0) {
          imageRepository.deleteMany({
            model_id: store._id
          });
        }
      });

    return {
      message: `the title store ${store.title} && imagen is deleted`,
      success: true,
      result: storeDeleted
    };
  } catch (error) {
    throw handlerHttpError(
      `Error delete store document, ${error}`,
      typesErrors.DATABASE_ERROR
    );
  }
};
