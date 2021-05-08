import { injectable, inject } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';
import IProfilesRepository from '../repositories/IProfilesRepository';
import Profile from '../infra/typeorm/entities/Profile';

interface IRequest {
  profile_id: string;
}

@injectable()
class ShowProfileService {
  constructor(
    @inject('ProfilesRepository')
    private profilesRepository: IProfilesRepository,
  ) {}

  public async execute({ profile_id }: IRequest): Promise<Profile | undefined> {
    const profile = await this.profilesRepository.findById(profile_id);

    if (!profile) {
      throw new AppError('Perfil não encontrado.');
    }

    return profile;
  }
}

export default ShowProfileService;
