import { createNewDocument } from './generalConsult';

/**
 *
 * @param values
 * @returns IImage
 */
export const generateDocImage = async (values) => {
  let result = null;

  if (values.gallery && values.gallery.length > 0) {
    result = await Promise.all(
      values.gallery.map(async (element) => {
        return await createNewDocument(
          { ...element, source: values.source },
          'image'
        );
      })
    );
  } else {
    result = await createNewDocument(
      { ...values.logo, ...values.main_image, source: values.source },
      'image'
    );
  }

  return result;
};
