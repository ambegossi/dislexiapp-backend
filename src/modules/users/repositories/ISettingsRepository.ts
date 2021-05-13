import Settings from '../infra/typeorm/entities/Settings';

export default interface ISettingsRepository {
  create(): Promise<Settings>;
}
