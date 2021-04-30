import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateAvatarService from '@modules/users/services/CreateAvatarService';
import ListAvatarsService from '@modules/users/services/ListAvatarsService';

export default class AvatarController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listAvatars = container.resolve(ListAvatarsService);

    const avatarList = await listAvatars.execute();

    return response.json(classToClass(avatarList));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const imageFilename = request.file.filename;

    const createAvatars = container.resolve(CreateAvatarService);

    const avatar = await createAvatars.execute({
      imageFilename,
    });

    return response.json(classToClass(avatar));
  }
}
