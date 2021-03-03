import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const showProfile = container.resolve(ShowProfileService);

    const { user, profile } = await showProfile.execute({ user_id });

    const userWithoutPassword = {
      id: user.id,
      name: user.name,
      profile_id: user.profile_id,
      created_at: user.created_at,
      updated_at: user.updated_at,
      profile,
    };

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

    const userWithoutPassword = {
      id: user.id,
      name: user.name,
      profile_id: user.profile_id,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };

    return response.json(userWithoutPassword);
  }
}
