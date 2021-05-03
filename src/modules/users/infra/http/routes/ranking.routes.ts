import { Router } from 'express';

import UsersRankingController from '../controllers/UsersRankingController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const rankingRouter = Router();
const usersRankingController = new UsersRankingController();

rankingRouter.use(ensureAuthenticated);

rankingRouter.get('/', usersRankingController.index);

export default rankingRouter;
