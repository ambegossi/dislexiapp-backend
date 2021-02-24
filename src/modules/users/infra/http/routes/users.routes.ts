import { Router } from 'express';

import CreateUserService from '@modules/users/services/CreateUserService';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  const { name, password } = request.body;

  const createUser = new CreateUserService();

  const nameLowerCase = name.toLowerCase();

  const user = await createUser.execute({
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

  return response.json(userWithoutPassword);
});

export default usersRouter;
