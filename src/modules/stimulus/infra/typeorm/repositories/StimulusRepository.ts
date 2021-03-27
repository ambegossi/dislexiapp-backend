import { getRepository, Repository } from 'typeorm';

import IStimulusRepository from '@modules/stimulus/repositories/IStimulusRepository';
import ICreateStimulusDTO from '@modules/stimulus/dtos/ICreateStimulusDTO';

import Stimulus from '../entities/Stimulus';

class StimulusRepository implements IStimulusRepository {
  private ormRepository: Repository<Stimulus>;

  constructor() {
    this.ormRepository = getRepository(Stimulus);
  }

  public async findAllStimulus(): Promise<Stimulus[]> {
    const stimulusList = await this.ormRepository.find();

    return stimulusList;
  }

  public async findStimulusBySyllabicType(
    syllabic_type: string,
    number: number,
  ): Promise<Stimulus[]> {
    const stimulusList = await getRepository(Stimulus)
      .createQueryBuilder()
      .where({ syllabic_type })
      .orderBy('RANDOM()')
      .limit(number)
      .getMany();

    return stimulusList;
  }

  public async create(stimulusData: ICreateStimulusDTO): Promise<Stimulus> {
    const stimulus = this.ormRepository.create(stimulusData);

    await this.ormRepository.save(stimulus);

    return stimulus;
  }

  public async save(stimulus: Stimulus): Promise<Stimulus> {
    return this.ormRepository.save(stimulus);
  }
}

export default StimulusRepository;
