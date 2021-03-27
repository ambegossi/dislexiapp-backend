import { Router } from 'express';
import multer from 'multer';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import uploadConfig from '@config/upload';

import StimulusController from '../controllers/StimulusController';

const stimulusRouter = Router();
const upload = multer(uploadConfig);
const stimulusController = new StimulusController();

stimulusRouter.use(ensureAuthenticated);

stimulusRouter.post('/', upload.single('image'), stimulusController.create);
stimulusRouter.get('/', stimulusController.index);

export default stimulusRouter;
