import { injectable, inject } from 'tsyringe';

import Avatar from '@modules/users/infra/typeorm/entities/Avatar';
import IAvatarsRepository from '../repositories/IAvatarsRepository';

@injectable()
class ListAvatarsService {
  constructor(
    @inject('AvatarsRepository')
    private avatarsRepository: IAvatarsRepository,
  ) {}

  public async execute(): Promise<Avatar[]> {
    const avatarList = await this.avatarsRepository.findAll();

    return avatarList;
  }
}

export default ListAvatarsService;
