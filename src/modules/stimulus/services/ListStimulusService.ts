import { injectable, inject } from 'tsyringe';

import Stimulus from '@modules/stimulus/infra/typeorm/entities/Stimulus';
import AppError from '@shared/errors/AppError';
import IStimulusRepository from '../repositories/IStimulusRepository';

interface IRequest {
  level: number;
}

@injectable()
class ListStimulusService {
  constructor(
    @inject('StimulusRepository')
    private stimulusRepository: IStimulusRepository,
  ) {}

  public async execute({ level }: IRequest): Promise<Stimulus[]> {
    let syllabic_type;

    if (level >= 1 && level <= 10) {
      syllabic_type = 'monosyllabic';
    } else if (level >= 10 && level <= 20) {
      syllabic_type = 'disyllabic';
    } else if (level >= 21 && level <= 30) {
      syllabic_type = 'trisyllabic';
    } else if (level >= 31) {
      syllabic_type = 'polysyllabic';
    }

    if (!syllabic_type) {
      throw new AppError(
        'It was not possible to find stimulus with this level informed.',
        500,
      );
    }

    const stimulusList = await this.stimulusRepository.findAllStimulusBySyllabicType(
      syllabic_type,
    );

    return stimulusList;
  }
}

export default ListStimulusService;
