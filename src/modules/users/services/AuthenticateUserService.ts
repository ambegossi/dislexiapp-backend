import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import User from '@modules/users/infra/typeorm/entities/User';

import authConfig from '../../../config/auth-config';
import AppError from '../../../shared/errors/AppError';

interface Request {
  name: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ name, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { name } });

    if (!user) {
      throw new AppError('Incorrect name/password combination.', 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect name/password combination.', 401);
    }

    const { jwt } = authConfig;

    const token = sign({}, jwt.secret, {
      subject: user.id,
      expiresIn: jwt.expiresIn,
    });

    return { user, token };
  }
}

export default AuthenticateUserService;