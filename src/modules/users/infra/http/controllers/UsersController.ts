import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserService from '@modules/users/services/UpdateUserService';

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

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const { name, password } = request.body;

    const updateUser = container.resolve(UpdateUserService);

    const nameLowerCase = name.toLowerCase();

    const user = await updateUser.execute({
      user_id,
      name: nameLowerCase,
      password,
    });

    return response.json(classToClass(user));
  }
}
