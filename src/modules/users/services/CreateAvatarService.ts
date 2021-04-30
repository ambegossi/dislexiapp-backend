import { injectable, inject } from 'tsyringe';

import Avatar from '@modules/users/infra/typeorm/entities/Avatar';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import IAvatarsRepository from '../repositories/IAvatarsRepository';

interface IRequest {
  imageFilename: string;
}

@injectable()
class CreateAvatarService {
  constructor(
    @inject('AvatarsRepository')
    private avatarsRepository: IAvatarsRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ imageFilename }: IRequest): Promise<Avatar> {
    const filename = await this.storageProvider.saveFile(imageFilename);

    const avatar = await this.avatarsRepository.create({
      image: filename,
    });

    return avatar;
  }
}

export default CreateAvatarService;
