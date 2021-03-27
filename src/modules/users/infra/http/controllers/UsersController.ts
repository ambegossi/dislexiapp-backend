import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateUserService from '@modules/users/services/CreateUserService';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, password } = request.body;

    const createUser = container.resolve(CreateUserService);

    const nameLowerCase = name.toLowerCase();

    const user = await createUser.execute({
      name: nameLowerCase,
      password,
    });

    return response.json(classToClass(user));
  }
}
