import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

import authConfig from '../../../config/auth-config';
import AppError from '../../../shared/errors/AppError';

interface IRequest {
  name: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ name, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByName(name);

    if (!user) {
      throw new AppError('Conta não encontrada.', 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Dados inválidos.', 401);
    }

    const { jwt } = authConfig;

    if (!jwt.secret) {
      throw new Error('Jwt secret not found');
    }

    const token = sign({}, jwt.secret, {
      subject: user.id,
      // expiresIn: jwt.expiresIn,
    });

    return { user, token };
  }
}

export default AuthenticateUserService;
