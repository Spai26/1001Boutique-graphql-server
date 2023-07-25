/* eslint-disable func-names */
/* eslint-disable object-shorthand */
import fs from 'fs';
import path from 'path';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { fileFilter } from '@utils/imageMimeFilter';
import { logger } from './winstom.lib';

// verifico si existe la carpeta para crearlo
let storageCreated = false;
const storagePath = path.join(__dirname, '../../uploads');

if (!storageCreated && !fs.existsSync(storagePath)) {
  try {
    fs.mkdirSync(storagePath, { recursive: true });
    logger.info('La carpeta se creó exitosamente.');
    storageCreated = true;
  } catch (err) {
    logger.info(
      'Error al crear la carpeta verifica si la ruta es correcta:',
      err
    );
  }
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, storagePath);
  },
  filename: function (req, file, cb) {
    const filename = `/${uuidv4()}${path.extname(file.originalname)}`;

    cb(null, filename);
  }
});

export const logoUpload = multer({ storage, fileFilter }).single('logo');
export const singleUpload = multer({ storage, fileFilter }).single('file');
export const multipleUpload = multer({ storage, fileFilter }).array(
  'gallery',
  10
);
