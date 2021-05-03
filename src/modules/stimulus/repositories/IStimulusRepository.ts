import Stimulus from '../infra/typeorm/entities/Stimulus';
import ICreateStimulusDTO from '../dtos/ICreateStimulusDTO';

export default interface IStimulusRepository {
  findAll(): Promise<Stimulus[]>;
  findBySyllabicTypes(
    syllabic_types: { syllabic_type: string }[],
    number: number,
  ): Promise<Stimulus[]>;
  create(data: ICreateStimulusDTO): Promise<Stimulus>;
  save(stimulus: Stimulus): Promise<Stimulus>;
}
