import { Router } from 'express';
import multer from 'multer';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import uploadConfig from '@config/upload';

import StimulusController from '../controllers/StimulusController';
import StimulusNARController from '../controllers/StimulusNARController';

const stimulusRouter = Router();
const upload = multer(uploadConfig.multer);
const stimulusController = new StimulusController();
const stimulusNARController = new StimulusNARController();

stimulusRouter.use(ensureAuthenticated);

stimulusRouter.post('/', upload.single('image'), stimulusController.create);
stimulusRouter.post(
  '/recognize',
  upload.single('audio'),
  stimulusNARController.create,
);
stimulusRouter.get('/', stimulusController.index);
stimulusRouter.get('/:profile_id', stimulusNARController.index);

export default stimulusRouter;
