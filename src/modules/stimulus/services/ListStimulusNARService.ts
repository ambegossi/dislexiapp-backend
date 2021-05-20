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
      throw new AppError('Perfil não encontrado.');
    }

    const { level } = profile;

    let syllabic_types;

    if (level >= 0 && level <= 5) {
      syllabic_types = [{ syllabic_type: 'monosyllabic' }];
    } else if (level >= 6 && level <= 19) {
      syllabic_types = [
        { syllabic_type: 'monosyllabic' },
        { syllabic_type: 'disyllabic' },
      ];
    } else if (level >= 20 && level <= 29) {
      syllabic_types = [
        { syllabic_type: 'monosyllabic' },
        { syllabic_type: 'disyllabic' },
        { syllabic_type: 'trisyllabic' },
      ];
    } else if (level >= 30) {
      syllabic_types = [
        { syllabic_type: 'monosyllabic' },
        { syllabic_type: 'disyllabic' },
        { syllabic_type: 'trisyllabic' },
        { syllabic_type: 'polysyllabic' },
      ];
    }

    if (!syllabic_types) {
      throw new AppError(
        'Não foi possível retornar a lista de estímulos.',
        500,
      );
    }

    const stimulusList = await this.stimulusRepository.findBySyllabicTypes(
      syllabic_types,
      number,
    );

    return stimulusList;
  }
}

export default ListStimulusNARService;
