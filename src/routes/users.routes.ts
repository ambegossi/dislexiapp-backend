import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  try {
    const { name, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
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

    return response.json(userWithoutPassword);
  } catch (err) {
    return response.status(err.statusCode).json({ error: err.message });
  }
});

export default usersRouter;
