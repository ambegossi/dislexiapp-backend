import { Router } from 'express';
import multer from 'multer';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import uploadConfig from '@config/upload';

import AvatarController from '../controllers/AvatarController';

const avatarsRouter = Router();
const upload = multer(uploadConfig.multer);
const avatarController = new AvatarController();

avatarsRouter.use(ensureAuthenticated);

avatarsRouter.post('/', upload.single('image'), avatarController.create);
avatarsRouter.get('/', avatarController.index);

export default avatarsRouter;
