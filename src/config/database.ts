import mongoose, { ConnectOptions } from 'mongoose';
import { keys } from './variables';

let database: mongoose.Connection;

const connection = keys.NODE_ENV !== 'production' ? keys.TEST : keys.URI;

export const connectionDB = async () => {
  if (database) {
    return;
  }
  mongoose.set('strictQuery', false);
  await mongoose.connect(connection, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  } as ConnectOptions);

  database = mongoose.connection;
};

export const disconnect = () => {
  if (!database) {
    return;
  }

  mongoose.disconnect();
};
