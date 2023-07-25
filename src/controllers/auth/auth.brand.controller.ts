import {
  createNewDocument,
  existDocById,
  generateDocImage
} from '@helpers/querys';
import {
  handlerHttpError,
  typesErrors
} from '@middlewares/handlerErrorsApollo';
import { BrandModel, ImageModel } from '@models/nosql';

export const createNewBrandDocument = async (input, context) => {
  try {
    const { alias } = context.user;
    const { logo, gallery, ...resInputBrand } = input;
    console.log(resInputBrand);
    // generate document image
    const [Dlogo, Dgallery] = await Promise.all([
      generateDocImage({ logo, source: alias }),
      generateDocImage({
        gallery,
        source: alias
      })
    ]);

    // genero un array de id
    const arrayGallery = Dgallery.map((item) => {
      // eslint-disable-next-line no-underscore-dangle
      return item._id;
    });

    const newBrand = await createNewDocument(
      {
        // eslint-disable-next-line no-underscore-dangle
        logo: Dlogo._id,
        gallery: arrayGallery,
        onwer: context.user.id,
        ...resInputBrand // all another fields
      },
      'brand'
    );

    // asignamos el modelo origen
    // eslint-disable-next-line no-underscore-dangle
    Dlogo.model_id = newBrand._id;

    Dgallery.forEach((element) => {
      const modified = { ...element };
      // eslint-disable-next-line no-underscore-dangle
      modified.model_id = newBrand._id;
    });

    // guardamos el doc en bd
    const result = await Promise.all([
      Dlogo.save(),
      ...Dgallery.map((doc) => doc.save()),
      newBrand.save()
    ]);

    return {
      message: 'Brand created!',
      success: !!result
    };
  } catch (error) {
    throw handlerHttpError(
      `Error creating new Brand document, ${error}`,
      typesErrors.DATABASE_ERROR
    );
  }
};

export const updateBrandimages = async (args) => {
  const { id } = args;
  const { logo, gallery } = args.input;
  try {
    const exist = await existDocById('brand', id);

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

export const deleteBrandCtr = async (id) => {
  try {
    const store = await existDocById('store', id);

    if (!store) {
      throw handlerHttpError('this store no valid', typesErrors.BAD_REQUEST);
    }
    const storeDeleted = await BrandModel.deleteOne({ _id: id });
    const imageDeleted = await ImageModel.deleteMany({
      // eslint-disable-next-line no-underscore-dangle
      model_id: store._id
    });

    if (storeDeleted.deletedCount > 0 && imageDeleted.deletedCount > 0) {
      return {
        message: `store Eliminate ${storeDeleted.deletedCount} && imagen relation ${imageDeleted.deletedCount}`,
        success: true
      };
    }
    return [];
  } catch (error) {
    throw handlerHttpError(
      `Error delete store document, ${error}`,
      typesErrors.DATABASE_ERROR
    );
  }
};
