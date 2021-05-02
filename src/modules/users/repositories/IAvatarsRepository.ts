import Avatar from '../infra/typeorm/entities/Avatar';
import ICreateAvatarDTO from '../dtos/ICreateAvatarDTO';

export default interface IAvatarsRepository {
  findAll(): Promise<Avatar[]>;
  findById(id: number): Promise<Avatar | undefined>;
  create(data: ICreateAvatarDTO): Promise<Avatar>;
  save(avatar: Avatar): Promise<Avatar>;
}
