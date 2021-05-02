import { injectable, inject } from 'tsyringe';

import Stimulus from '@modules/stimulus/infra/typeorm/entities/Stimulus';
import AppError from '@shared/errors/AppError';
import IProfilesRepository from '@modules/users/repositories/IProfilesRepository';
import IStimulusRepository from '../repositories/IStimulusRepository';

interface IRequest {
  profile_id: string;
  number: number;
}

@injectable()
class ListStimulusNARService {
  constructor(
    @inject('StimulusRepository')
    private stimulusRepository: IStimulusRepository,

    @inject('ProfilesRepository')
    private profilesRepository: IProfilesRepository,
  ) {}

  public async execute({ profile_id, number }: IRequest): Promise<Stimulus[]> {
    const profile = await this.profilesRepository.findById(profile_id);

    if (!profile) {
      throw new AppError('Profile not found.');
    }

    const { level } = profile;

    let syllabic_type;

    if (level >= 0 && level <= 9) {
      syllabic_type = 'monosyllabic';
    } else if (level >= 10 && level <= 19) {
      syllabic_type = 'disyllabic';
    } else if (level >= 20 && level <= 29) {
      syllabic_type = 'trisyllabic';
    } else if (level >= 30) {
      syllabic_type = 'polysyllabic';
    }

    if (!syllabic_type) {
      throw new AppError(
        'It was not possible to find stimulus with this level informed.',
        500,
      );
    }

    const stimulusList = await this.stimulusRepository.findBySyllabicType(
      syllabic_type,
      number,
    );

    return stimulusList;
  }
}

export default ListStimulusNARService;
