import { getRepository, Repository } from 'typeorm';

import IProfilesRepository from '@modules/users/repositories/IProfilesRepository';

import Profile from '../entities/Profile';

class profilesRepository implements IProfilesRepository {
  private ormRepository: Repository<Profile>;

  constructor() {
    this.ormRepository = getRepository(Profile);
  }

  public async findById(id: string): Promise<Profile | undefined> {
    const profile = await this.ormRepository.findOne({
      where: { id },
      relations: ['avatar'],
    });

    return profile;
  }

  public async create(): Promise<Profile> {
    const profile = this.ormRepository.create();

    await this.ormRepository.save(profile);

    return profile;
  }

  public async save(profile: Profile): Promise<Profile> {
    return this.ormRepository.save(profile);
  }

  public async remove(profile: Profile): Promise<Profile> {
    return this.ormRepository.remove(profile);
  }
}

export default profilesRepository;
