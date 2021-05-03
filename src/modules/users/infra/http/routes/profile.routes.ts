import { Router } from 'express';

import ProfileController from '../controllers/ProfileController';
import ProfileAvatarController from '../controllers/ProfileAvatarController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const profileRouter = Router();
const profileController = new ProfileController();
const profileAvatarController = new ProfileAvatarController();

profileRouter.use(ensureAuthenticated);

profileRouter.get('/:profile_id', profileController.show);
profileRouter.put('/', profileController.update);
profileRouter.patch('/avatar', profileAvatarController.update);

export default profileRouter;
