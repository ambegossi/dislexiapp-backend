import { injectable, inject } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

import AppError from '../../../shared/errors/AppError';

interface IRequest {
  user_id: string;
  score: number;
  level: number;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id, score, level }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Conta não encontrada.');
    }

    user.profile.score = score;
    user.profile.level = level;

    return this.usersRepository.save(user);
  }
}

export default UpdateProfileService;
