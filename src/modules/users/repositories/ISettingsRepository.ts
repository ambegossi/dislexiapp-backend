import Settings from '../infra/typeorm/entities/Settings';

export default interface ISettingsRepository {
  create(): Promise<Settings>;
  save(settings: Settings): Promise<Settings>;
  remove(settings: Settings): Promise<Settings>;
}
