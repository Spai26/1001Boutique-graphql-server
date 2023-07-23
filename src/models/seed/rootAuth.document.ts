import { IUserDocument } from '@interfaces/user.interface';
import { RolModel } from '@models/nosql/roles.models';
import { UserModel } from '@models/nosql/user.models';
import { keys } from '@config/variables';
import { logger } from '@libs/winstom.lib';

export const createUser = async (): Promise<IUserDocument> => {
  try {
    const count = await UserModel.estimatedDocumentCount();
    const rol = await RolModel.findOne({ name: keys.ROOTROL });

    if (count > 0) return;
    const value = new UserModel({
      firstname: keys.ROOTNAME,
      lastname: keys.ROOTLAST,
      username: keys.ROOTROL,
      email: keys.ROOTEMAIL,
      password: keys.ROOTPASSWORD,
      rol: rol._id
    });
    //set timer for wait another documents
    setTimeout(async () => {
      await value.save();
      logger.info(value);
    }, 5000);
  } catch (error) {
    logger.info(error);
  }
};
