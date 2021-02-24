import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '@modules/users/infra/typeorm/entities/User';
import Profile from '@modules/users/infra/typeorm/entities/Profile';

import AppError from '../../../shared/errors/AppError';

interface Request {
  name: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, password }: Request): Promise<User> {
    const usersRepository = getRepository(User);
    const profilesRepository = getRepository(Profile);

    const checkUserExists = await usersRepository.findOne({
      where: { name },
    });

    if (checkUserExists) {
      throw new AppError('User name already used.');
    }

    const profile = profilesRepository.create();

    const savedProfile = await profilesRepository.save(profile);

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      name,
      password: hashedPassword,
      profile_id: savedProfile.id,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
