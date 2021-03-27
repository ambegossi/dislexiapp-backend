import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const showProfile = container.resolve(ShowProfileService);

    const { user, profile } = await showProfile.execute({ user_id });

    const userWithoutPassword = classToClass(user);

    userWithoutPassword.profile = profile;

    return response.json(userWithoutPassword);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const { name, password } = request.body;

    const updateProfile = container.resolve(UpdateProfileService);

    const nameLowerCase = name.toLowerCase();

    const user = await updateProfile.execute({
      user_id,
      name: nameLowerCase,
      password,
    });

    return response.json(classToClass(user));
  }
}
