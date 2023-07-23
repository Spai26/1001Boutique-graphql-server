import { v2 as cloudinary } from 'cloudinary';
import { keys } from '@config/variables';

cloudinary.config({
  cloud_name: keys.CLOUDINARY_NAME,
  api_key: keys.CLOUDINARY_KEY,
  api_secret: keys.CLOUDINARY_PASS
});

export default cloudinary;
