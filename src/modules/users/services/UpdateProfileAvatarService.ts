import { injectable, inject } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
import IAvatarsRepository from '../repositories/IAvatarsRepository';

import AppError from '../../../shared/errors/AppError';

interface IRequest {
  user_id: string;
  avatar_id: number | null;
}

@injectable()
class UpdateProfileAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('AvatarsRepository')
    private avatarsRepository: IAvatarsRepository,
  ) {}

  public async execute({ user_id, avatar_id }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Conta não encontrada.');
    }

    if (avatar_id) {
      const avatar = await this.avatarsRepository.findById(avatar_id);

      if (!avatar) {
        throw new AppError('Avatar não encontrado.');
      }

      user.profile.avatar = avatar;
    } else {
      user.profile.avatar = null;
    }

    return this.usersRepository.save(user);
  }
}

export default UpdateProfileAvatarService;
