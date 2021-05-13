import { injectable, inject } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
import IProfilesRepository from '../repositories/IProfilesRepository';
import ISettingsRepository from '../repositories/ISettingsRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import AppError from '../../../shared/errors/AppError';

interface IRequest {
  name: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('ProfilesRepository')
    private profilesRepository: IProfilesRepository,

    @inject('SettingsRepository')
    private settingsRepository: ISettingsRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ name, password }: IRequest): Promise<User> {
    const checkUserExists = await this.usersRepository.findByName(name);

    if (checkUserExists) {
      throw new AppError('Este nome já está sendo usado.');
    }

    const profile = await this.profilesRepository.create();

    const settings = await this.settingsRepository.create();

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      password: hashedPassword,
      profile,
      settings,
    });

    return user;
  }
}

export default CreateUserService;
