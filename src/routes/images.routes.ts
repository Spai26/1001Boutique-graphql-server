import fs from 'fs';
import { Response, Router } from 'express';

import { uploadImage } from '@helpers/generateImageUrl';
import { ResponseResult } from '@interfaces/index';
import { logoUpload, multipleUpload, singleUpload } from '@libs/multerStorage';

const router = Router();

//logo
router.post('/logo', logoUpload, async (req, res) => {
  try {
    const { path } = req.file;

    const tmpPath = path;

    const cloudinaryUpload = await uploadImage(tmpPath);

    fs.unlink(tmpPath, (error) => {
      if (error) {
        console.error('Error deleting temporary file:', error);
      }
    });
    return res
      .status(200)
      .json({ message: `${cloudinaryUpload}`, success: true });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

//file
router.post('/portada', singleUpload, async (req, res) => {
  try {
    const { path } = req.file;

    const tmpPath = path;

    const cloudinaryUpload = await uploadImage(tmpPath);

    fs.unlink(tmpPath, (error) => {
      if (error) {
        console.error('Error deleting temporary file:', error);
      }
    });

    return res
      .status(200)
      .json({ message: `${cloudinaryUpload}`, success: true });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

//gallery
router.post(
  '/gallery',
  multipleUpload,
  async (req, res): Promise<Response<ResponseResult>> => {
    const files = req.files as Express.Multer.File[];

    const uploadPromises = files.map(async (file) => {
      const tempPath = file.path;
      const imageUrl = await uploadImage(tempPath);

      fs.unlink(tempPath, (error) => {
        if (error) {
          console.error('Error deleting temporary file:', error);
        }
      });

      return imageUrl;
    });

    const results = await Promise.all(uploadPromises);

    return res.status(200).json({ message: results, success: true });
  }
);

export { router };
