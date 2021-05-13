import { Router } from 'express';

import SettingsController from '../controllers/SettingsController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const settingsRouter = Router();
const settingsController = new SettingsController();

settingsRouter.use(ensureAuthenticated);

settingsRouter.put('/', settingsController.update);

export default settingsRouter;
