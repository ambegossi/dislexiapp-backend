import { injectable, inject } from 'tsyringe';

import Stimulus from '@modules/stimulus/infra/typeorm/entities/Stimulus';
import IStimulusRepository from '../repositories/IStimulusRepository';

@injectable()
class ListStimulusService {
  constructor(
    @inject('StimulusRepository')
    private stimulusRepository: IStimulusRepository,
  ) {}

  public async execute(): Promise<Stimulus[]> {
    const stimulusList = await this.stimulusRepository.findAll();

    return stimulusList;
  }
}

export default ListStimulusService;
