import { injectable, inject } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequest {
  number: number;
}

@injectable()
class ListUsersRankingService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ number }: IRequest): Promise<User[]> {
    const usersRankingList = await this.usersRepository.findByProfileScoreOrder(
      number,
    );

    return usersRankingList;
  }
}

export default ListUsersRankingService;
