import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import avatarsRouter from '@modules/users/infra/http/routes/avatars.routes';
import stimulusRouter from '@modules/stimulus/infra/http/routes/stimulus.routes';
import rankingRouter from '@modules/users/infra/http/routes/ranking.routes';
import settingsRouter from '@modules/users/infra/http/routes/settings.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/profile', profileRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/avatars', avatarsRouter);
routes.use('/stimulus', stimulusRouter);
routes.use('/ranking', rankingRouter);
routes.use('/settings', settingsRouter);

export default routes;
