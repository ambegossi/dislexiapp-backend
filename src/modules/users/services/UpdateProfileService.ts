import { injectable, inject } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import AppError from '../../../shared/errors/AppError';

interface IRequest {
  user_id: string;
  name: string;
  password: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) { }

  public async execute({ user_id, name, password }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found.');
    }

    const userWithUpdatedName = await this.usersRepository.findByName(name);

    if (userWithUpdatedName && userWithUpdatedName.id !== user_id) {
      throw new AppError('Name already in use.');
    }

    user.name = name;
    user.password = await this.hashProvider.generateHash(password);

    return this.usersRepository.save(user);
  }
}

export default UpdateProfileService;
