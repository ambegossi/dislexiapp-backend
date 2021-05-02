import { getRepository, Repository } from 'typeorm';

import IAvatarsRepository from '@modules/users/repositories/IAvatarsRepository';
import ICreateAvatarDTO from '@modules/users/dtos/ICreateAvatarDTO';

import Avatar from '../entities/Avatar';

class AvatarsRepository implements IAvatarsRepository {
  private ormRepository: Repository<Avatar>;

  constructor() {
    this.ormRepository = getRepository(Avatar);
  }

  public async findAll(): Promise<Avatar[]> {
    const avatarList = await this.ormRepository.find();

    return avatarList;
  }

  public async findById(id: number): Promise<Avatar | undefined> {
    const avatar = await this.ormRepository.findOne(id);

    return avatar;
  }

  public async create(avatarData: ICreateAvatarDTO): Promise<Avatar> {
    const avatar = this.ormRepository.create(avatarData);

    await this.ormRepository.save(avatar);

    return avatar;
  }

  public async save(avatar: Avatar): Promise<Avatar> {
    return this.ormRepository.save(avatar);
  }
}

export default AvatarsRepository;
