import Profile from '../infra/typeorm/entities/Profile';

export default interface IProfilesRepository {
  create(): Promise<Profile>;
  save(profile: Profile): Promise<Profile>;
}
