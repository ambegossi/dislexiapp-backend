import Stimulus from '../infra/typeorm/entities/Stimulus';
import ICreateStimulusDTO from '../dtos/ICreateStimulusDTO';

export default interface IStimulusRepository {
  findAllStimulusBySyllabicType(syllabic_type: string): Promise<Stimulus[]>;
  create(data: ICreateStimulusDTO): Promise<Stimulus>;
  save(stimulus: Stimulus): Promise<Stimulus>;
}
