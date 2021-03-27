import { injectable, inject } from 'tsyringe';

import Stimulus from '@modules/stimulus/infra/typeorm/entities/Stimulus';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import IStimulusRepository from '../repositories/IStimulusRepository';

interface IRequest {
  word: string;
  imageFilename: string;
  syllabic_type: string;
}

@injectable()
class CreateStimulusService {
  constructor(
    @inject('StimulusRepository')
    private stimulusRepository: IStimulusRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    word,
    imageFilename,
    syllabic_type,
  }: IRequest): Promise<Stimulus> {
    const filename = await this.storageProvider.saveFile(imageFilename);

    const stimulus = await this.stimulusRepository.create({
      word,
      image: filename,
      syllabic_type,
    });

    return stimulus;
  }
}

export default CreateStimulusService;
