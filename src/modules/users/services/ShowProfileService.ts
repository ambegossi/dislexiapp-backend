import { injectable, inject } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import User from '../infra/typeorm/entities/User';
import IProfilesRepository from '../repositories/IProfilesRepository';
import Profile from '../infra/typeorm/entities/Profile';

interface IRequest {
  user_id: string;
}

@injectable()
class ShowProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('ProfilesRepository')
    private profilesRepository: IProfilesRepository,
  ) { }

  public async execute({
    user_id,
  }: IRequest): Promise<{ user: User; profile: Profile }> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found.');
    }

    const profile = await this.profilesRepository.findById(user.profile_id);

    if (!profile) {
      throw new AppError('Profile not found.');
    }

    return {
      user,
      profile,
    };
  }
}

export default ShowProfileService;
