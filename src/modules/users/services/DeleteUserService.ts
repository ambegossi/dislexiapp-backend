import { injectable, inject } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
import IProfilesRepository from '../repositories/IProfilesRepository';
import ISettingsRepository from '../repositories/ISettingsRepository';

import AppError from '../../../shared/errors/AppError';

interface IRequest {
  user_id: string;
}

@injectable()
class DeleteUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('ProfilesRepository')
    private profilesRepository: IProfilesRepository,

    @inject('SettingsRepository')
    private settingsRepository: ISettingsRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Conta não encontrada.');
    }

    await this.profilesRepository.remove(user.profile);

    await this.settingsRepository.remove(user.settings);

    return user;
  }
}

export default DeleteUserService;
