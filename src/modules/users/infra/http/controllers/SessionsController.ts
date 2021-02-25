import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, password } = request.body;

    const authenticateUser = container.resolve(AuthenticateUserService);

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
  }
}
