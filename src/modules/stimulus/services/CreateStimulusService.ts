import { injectable, inject } from 'tsyringe';

import Stimulus from '@modules/stimulus/infra/typeorm/entities/Stimulus';
import IStimulusRepository from '../repositories/IStimulusRepository';

interface IRequest {
  word: string;
  image: string;
  syllabic_type: string;
}

@injectable()
class CreateStimulusService {
  constructor(
    @inject('StimulusRepository')
    private stimulusRepository: IStimulusRepository,
  ) {}

  public async execute({
    word,
    image,
    syllabic_type,
  }: IRequest): Promise<Stimulus> {
    const stimulus = await this.stimulusRepository.create({
      word,
      image,
      syllabic_type,
    });

    return stimulus;
  }
}

export default CreateStimulusService;
