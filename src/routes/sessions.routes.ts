import { Router } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  try {
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

    return response.json({ userWithoutPassword, token });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default sessionsRouter;
