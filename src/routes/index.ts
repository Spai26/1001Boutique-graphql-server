import { Router } from 'express';
import { readdirSync } from 'fs';
import { removeExtends } from '@utils/funcitonHelpers';

const path_route = `${__dirname}`;
const apiRoute = Router();

readdirSync(path_route).filter((filename) => {
  const routefile = removeExtends(filename);
  if (routefile !== 'index') {
    import(`./${routefile}.routes`).then((moduleRouter) => {
      apiRoute.use(`/${routefile}`, moduleRouter.router);
    });
  }
});

export default apiRoute;
