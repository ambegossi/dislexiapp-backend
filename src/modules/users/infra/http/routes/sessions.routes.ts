import { Router } from 'express';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { name, password } = request.body;

  const usersRepository = new UsersRepository();
  const authenticateUser = new AuthenticateUserService(usersRepository);

  const nameLowerCase = name.toLowerCase();

  const { user, token } = await authenticateUser.execute({
    name: nameLowerCase,
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
