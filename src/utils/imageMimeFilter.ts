import { Request, Express } from 'express';
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
    cb(
      new Error(
        `The file mimetype '${
          file.mimetype
        }' is not allowed. Allowed mimetypes are: ${allowedMimeTypes.join(
          ', '
        )}`
      )
    );
  }
};
