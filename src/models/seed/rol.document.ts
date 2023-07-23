import { IRolDocument } from '@interfaces/rol.interface';
import { logger } from '@libs/winstom.lib';
import { RolModel } from '@models/nosql/roles.models';
import { keys } from '@config/variables';

export const createRoles = async (): Promise<IRolDocument[]> => {
  try {
    const count = await RolModel.estimatedDocumentCount();

    if (count > 0) return;

    const values = await Promise.all([
      new RolModel({ name: 'usuario' }).save(),
      new RolModel({ name: 'vendor' }).save(),
      new RolModel({ name: 'editor' }).save(),
      new RolModel({ name: 'brand' }).save(),
      new RolModel({ name: 'administrator' }).save(),
      new RolModel({ name: keys.ROOTROL }).save()
    ]);
    logger.info(values);
  } catch (error) {
    logger.info('fields dont agregated.!');
  }
};
