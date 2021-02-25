import { hash } from 'bcryptjs';
import { injectable, inject } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
import IProfilesRepository from '../repositories/IProfilesRepository';

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
  ) { }

  public async execute({ name, password }: IRequest): Promise<User> {
    const checkUserExists = await this.usersRepository.findByName(name);

    if (checkUserExists) {
      throw new AppError('User name already used.');
    }

    const profile = await this.profilesRepository.create();

    const hashedPassword = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      password: hashedPassword,
      profile_id: profile.id,
    });

    return user;
  }
}

export default CreateUserService;
