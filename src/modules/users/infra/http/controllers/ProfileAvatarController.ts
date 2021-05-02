import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UpdateProfileAvatarService from '@modules/users/services/UpdateProfileAvatarService';

export default class ProfileAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const { avatar_id } = request.body;

    const updateProfileAvatar = container.resolve(UpdateProfileAvatarService);

    const user = await updateProfileAvatar.execute({
      user_id,
      avatar_id,
    });

    return response.json(classToClass(user));
  }
}
