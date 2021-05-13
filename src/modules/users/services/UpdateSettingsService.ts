import { injectable, inject } from 'tsyringe';

import Settings from '@modules/users/infra/typeorm/entities/Settings';
import IUsersRepository from '../repositories/IUsersRepository';

import AppError from '../../../shared/errors/AppError';

interface IRequest {
  user_id: string;
  font_family: string;
  speaking_rate: number;
  private_profile: boolean;
}

@injectable()
class UpdateSettingsService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    user_id,
    font_family,
    speaking_rate,
    private_profile,
  }: IRequest): Promise<Settings> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Conta não encontrada.');
    }

    user.settings.font_family = font_family;
    user.settings.speaking_rate = speaking_rate;
    user.settings.private_profile = private_profile;

    await this.usersRepository.save(user);

    return user.settings;
  }
}

export default UpdateSettingsService;
