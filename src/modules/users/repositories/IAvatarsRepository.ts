import Avatar from '../infra/typeorm/entities/Avatar';
import ICreateAvatarDTO from '../dtos/ICreateAvatarDTO';

export default interface IAvatarsRepository {
  findAllAvatars(): Promise<Avatar[]>;
  create(data: ICreateAvatarDTO): Promise<Avatar>;
  save(avatar: Avatar): Promise<Avatar>;
}
