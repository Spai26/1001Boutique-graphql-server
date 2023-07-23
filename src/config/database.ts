import mongoose, { ConnectOptions } from 'mongoose';
import { keys } from './variables';
import { logger } from '@libs/winstom.lib';

let database: mongoose.Connection;

export const connectionDB = async () => {
  if (database) {
    return;
  }
  mongoose.set('strictQuery', false);
  await mongoose.connect(keys.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  } as ConnectOptions);

  database = mongoose.connection;

  database.once('open', async () => {
    logger.info("Connected to the database successfully! It's time to work!");
  });

  database.on('error', async () => {
    logger.info(`Connection error, please verify the credentials`);
  });
};

export const disconnect = () => {
  if (!database) {
    return;
  }

  mongoose.disconnect();
};
