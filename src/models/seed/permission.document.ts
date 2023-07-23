import { IPermisionDocument } from '@interfaces/permission.interface';
import { logger } from '@libs/winstom.lib';
import { PermisionModel } from '@models/nosql/permission.models';

export const createPermissionBase = async (): Promise<IPermisionDocument[]> => {
  try {
    const count = await PermisionModel.estimatedDocumentCount();

    if (count > 0) return;

    const values = await Promise.all([
      new PermisionModel({ name: 'created' }).save(),
      new PermisionModel({ name: 'read' }).save(),
      new PermisionModel({ name: 'updated' }).save(),
      new PermisionModel({ name: 'deleted' }).save()
    ]);
    logger.info(values);
  } catch (error) {
    logger.info('fields dont agregated.!');
  }
};
