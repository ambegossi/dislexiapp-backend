import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../models/User';
import Profile from '../models/Profile';

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
      throw new Error('User name already used.');
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
