import { Request } from 'express';
import { FileFilterCallback } from 'multer';

const allowedMimeTypes: string[] = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/jpg'
];

/**
 * * function is to filter uploaded files and only allow those that have a mimetype starting with "image/
 * @param req
 * @param file
 * @param cb
 */
export const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('The file is not a valid image.'));
  }
};

/**
 * * function take name for file
 * @param filename
 * @returns
 */
export const removeExtends = (filename: string) => {
  return filename.split('.').shift();
};

export const generateSlug = (data: string) => {
  return data
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
};
