import Stimulus from '../infra/typeorm/entities/Stimulus';
import ICreateStimulusDTO from '../dtos/ICreateStimulusDTO';

export default interface IStimulusRepository {
  findAllStimulus(): Promise<Stimulus[]>;
  findStimulusBySyllabicType(
    syllabic_type: string,
    number: number,
  ): Promise<Stimulus[]>;
  create(data: ICreateStimulusDTO): Promise<Stimulus>;
  save(stimulus: Stimulus): Promise<Stimulus>;
}
