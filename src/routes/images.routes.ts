import fs from 'fs';
import { Response, Router, Express } from 'express';

import { uploadImage } from '@helpers/generateImageUrl';
import { ResponseResult } from '@interfaces/index';
import { logoUpload, multipleUpload, singleUpload } from '@libs/multerStorage';
import { logger } from '@libs/winstom.lib';

const router = Router();

/**
 * * Enpoint for Logo Image
 * ? .../api/images/logo
 */
router.post('/logo', logoUpload, async (req, res): Promise<Response> => {
  try {
    const { path } = req.file;
    const tmpPath = path;

    const cloudinaryUpload = await uploadImage(tmpPath);

    fs.unlink(tmpPath, (error) => {
      if (error) {
        logger.warning('Error deleting temporary file:', error);
      }
    });
    return res
      .status(200)
      .json({ message: `${cloudinaryUpload}`, success: !!cloudinaryUpload });
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong' });
  }
});

/**
 * * Enpoint for file Image
 *  ? .../api/images/portada
 */
router.post('/portada', singleUpload, async (req, res): Promise<Response> => {
  try {
    const { path } = req.file;
    const tmpPath = path;

    const cloudinaryUpload = await uploadImage(tmpPath);

    fs.unlink(tmpPath, (error) => {
      if (error) {
        logger.warning('Error deleting temporary file:', error);
      }
    });

    return res
      .status(200)
      .json({ message: `${cloudinaryUpload}`, success: !!cloudinaryUpload });
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong' });
  }
});

/**
 * * Enpoint for Array Image - gallery
 *  ? .../api/images/gallery
 */
router.post(
  '/gallery',
  multipleUpload,
  async (req, res): Promise<Response<ResponseResult>> => {
    try {
      const files = req.files as Express.Multer.File[];

      const uploadPromises = files.map(async (file) => {
        const tempPath = file.path;
        const imageUrl = await uploadImage(tempPath);

        fs.unlink(tempPath, (error) => {
          if (error) {
            logger.warning('Error deleting temporary file:', error);
          }
        });

        return imageUrl;
      });
      const results = await Promise.all(uploadPromises);

      return res.status(200).json({ message: results, success: !!results });
    } catch (error) {
      return res.status(500).json({ error: 'Something went wrong' });
    }
  }
);

export { router };
