import { getRepository, Repository, Raw } from 'typeorm';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

import User from '../entities/User';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { id },
      relations: ['profile', 'profile.avatar', 'settings'],
    });

    return user;
  }

  public async findByName(name: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        name: Raw(value => `LOWER(${value}) Like '%${name.toLowerCase()}%'`),
      },
      relations: ['profile', 'profile.avatar', 'settings'],
    });

    return user;
  }

  public async findByProfileScoreOrder(number: number): Promise<User[]> {
    const users = await this.ormRepository
      .createQueryBuilder('users')
      .leftJoinAndSelect('users.profile', 'profile')
      .leftJoinAndSelect('profile.avatar', 'avatar')
      .leftJoinAndSelect('users.settings', 'settings')
      .where('settings.private_profile = :private_profile', {
        private_profile: false,
      })
      .orderBy({
        'profile.score': 'DESC',
      })
      .limit(number)
      .getMany();

    return users;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(userData);

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}

export default UsersRepository;
