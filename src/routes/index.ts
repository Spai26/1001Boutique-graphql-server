import { removeExtends } from '@utils/textManipulation';
import { Router } from 'express';
import { readdirSync } from 'fs';

const pathRoute = `${__dirname}`;
const apiRoute = Router();

readdirSync(pathRoute).forEach((filename) => {
  const routefile = removeExtends(filename);
  if (routefile !== 'index') {
    import(`./${routefile}.routes`).then((moduleRouter) => {
      apiRoute.use(`/${routefile}`, moduleRouter.router);
    });
  }
});

export { apiRoute };
