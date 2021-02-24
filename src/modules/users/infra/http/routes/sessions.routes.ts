import { Router } from 'express';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { name, password } = request.body;

  const authenticateUser = new AuthenticateUserService();

  const { user, token } = await authenticateUser.execute({
    name,
    password,
  });

  const userWithoutPassword = {
    id: user.id,
    name: user.name,
    profile_id: user.profile_id,
    created_at: user.created_at,
    updated_at: user.updated_at,
  };

  return response.json({ user: userWithoutPassword, token });
});

export default sessionsRouter;
