import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, password } = request.body;

    const authenticateUser = container.resolve(AuthenticateUserService);

    const nameWhitespaceStripped = name.trim();

    const { user, token } = await authenticateUser.execute({
      name: nameWhitespaceStripped,
      password,
    });

    return response.json({ user: classToClass(user), token });
  }
}
