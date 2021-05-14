import Profile from '../infra/typeorm/entities/Profile';

export default interface IProfilesRepository {
  findById(id: string): Promise<Profile | undefined>;
  create(): Promise<Profile>;
  save(profile: Profile): Promise<Profile>;
  remove(profile: Profile): Promise<Profile>;
}
