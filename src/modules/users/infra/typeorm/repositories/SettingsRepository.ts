import { getRepository, Repository } from 'typeorm';

import ISettingsRepository from '@modules/users/repositories/ISettingsRepository';

import Settings from '../entities/Settings';

class settingsRepository implements ISettingsRepository {
  private ormRepository: Repository<Settings>;

  constructor() {
    this.ormRepository = getRepository(Settings);
  }

  public async create(): Promise<Settings> {
    const settings = this.ormRepository.create();

    await this.ormRepository.save(settings);

    return settings;
  }

  public async save(settings: Settings): Promise<Settings> {
    return this.ormRepository.save(settings);
  }

  public async remove(settings: Settings): Promise<Settings> {
    return this.ormRepository.remove(settings);
  }
}

export default settingsRepository;
