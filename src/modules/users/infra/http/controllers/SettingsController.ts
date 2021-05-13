import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateSettingsService from '@modules/users/services/UpdateSettingsService';

export default class SettingsController {
  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const { font_family, speaking_rate, private_profile } = request.body;

    const updateSettings = container.resolve(UpdateSettingsService);

    const settings = await updateSettings.execute({
      user_id,
      font_family,
      speaking_rate,
      private_profile,
    });

    return response.json(settings);
  }
}
