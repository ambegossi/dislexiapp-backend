import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListUsersRankingService from '@modules/users/services/ListUsersRankingService';

export default class UsersRankingController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { number } = request.query;

    const listUsersRanking = container.resolve(ListUsersRankingService);

    const usersRankingList = await listUsersRanking.execute({
      number: Number(number),
    });

    return response.json(classToClass(usersRankingList));
  }
}
