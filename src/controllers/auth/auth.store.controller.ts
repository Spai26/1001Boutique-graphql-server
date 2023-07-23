import {
  createNewDocument,
  existDocById,
  generateDocImage
} from '@helpers/querys';

import {
  handlerHttpError,
  typesErrors
} from '@middlewares/handlerErrorsApollo';
import { ImageModel, StoreModel } from '@models/nosql';

/***
 * * the function is to create a new store document in the database, including generating and saving images associated with the store
 */
export const createNewStoreDocument = async (input, context) => {
  try {
    const { alias } = context.user;
    const { main_image, logo, gallery, ...resInput } = input;

    const exist = await existDocById('store', resInput._id);

    if (!exist) {
      throw handlerHttpError(
        'Missing required input values',
        typesErrors.BAD_REQUEST
      );
    }

    //generate document image
    const [Dlogo, Dportada, Dgallery] = await Promise.all([
      generateDocImage({ logo, source: alias }),
      generateDocImage({
        main_image,
        source: alias
      }),
      generateDocImage({
        gallery,
        source: alias
      })
    ]);

    //genero un array de id
    const arrayGallery = Dgallery.map((item) => {
      return item._id;
    });

    const newStore = await createNewDocument(
      {
        main_image: Dportada._id,
        logo: Dlogo._id,
        gallery: arrayGallery,
        onwer: context.user.id,
        ...resInput //all another fields
      },
      'store'
    );

    //asignamos el modelo origen
    Dlogo.model_id = newStore._id;
    Dportada.model_id = newStore._id;
    Dgallery.forEach((element) => {
      element.model_id = newStore._id;
    });

    //guardamos el doc en bd
    const result = await Promise.all([
      Dlogo.save(),
      Dportada.save(),
      ...Dgallery.map((doc) => doc.save()),
      newStore.save()
    ]);

    return {
      message: 'Store created!',
      success: !!result
    };
  } catch (error) {
    throw handlerHttpError(
      `Error creating new store document, ${error}`,
      typesErrors.DATABASE_ERROR
    );
  }
};

export const updateStoreImages = async (values) => {
  try {
    const { id } = values;
    const { logo, main_image, gallery } = values.input;

    const exist = await existDocById('store', id);

    if (!exist) {
      throw handlerHttpError(
        'Missing required input values',
        typesErrors.BAD_REQUEST
      );
    }

    if (exist.logo || exist.logo === null) {
      const { url, _id } = await existDocById('image', exist.logo);
      if (url !== logo.url) {
        await ImageModel.findByIdAndUpdate(_id, { url: logo.url });
      }
    }

    if (exist.main_image || exist.main_image === null) {
      const { url, _id } = await existDocById('image', exist.main_image);
      if (url !== main_image.url) {
        await ImageModel.findByIdAndUpdate(_id, { url: main_image.url });
      }
    }
    if (exist.gallery || exist.gallery === null) {
      exist.gallery.map(async (imageObjectId, i) => {
        const galleryItem = gallery[i];

        const { _id, url } = await ImageModel.findById(imageObjectId);
        if (url !== galleryItem.url) {
          await ImageModel.findByIdAndUpdate(_id, { url: galleryItem.url });
        }
      });
    }
    return {
      message: 'Campos de imagen actualizado',
      success: true
    };
  } catch (error) {
    throw handlerHttpError(
      `Error update images store document, ${error}`,
      typesErrors.DATABASE_ERROR
    );
  }
};

export const deleteStoreCtr = async (id) => {
  try {
    const store = await existDocById('store', id);

    if (!store) {
      throw handlerHttpError('this store no valid', typesErrors.BAD_REQUEST);
    }
    const storeDeleted = await StoreModel.deleteOne({ _id: id });
    const imageDeleted = await ImageModel.deleteMany({
      model_id: store._id
    });

    if (storeDeleted.deletedCount > 0 && imageDeleted.deletedCount > 0) {
      return {
        message: `store Eliminate ${storeDeleted.deletedCount} && imagen relation ${imageDeleted.deletedCount}`,
        success: true
      };
    }
  } catch (error) {
    throw handlerHttpError(
      `Error delete store document, ${error}`,
      typesErrors.DATABASE_ERROR
    );
  }
};
