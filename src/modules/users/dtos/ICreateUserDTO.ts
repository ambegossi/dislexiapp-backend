import Profile from '../infra/typeorm/entities/Profile';
import Settings from '../infra/typeorm/entities/Settings';

export default interface ICreateUserDTO {
  name: string;
  password: string;
  profile: Profile;
  settings: Settings;
}
