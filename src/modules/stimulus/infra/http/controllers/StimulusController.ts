import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateStimulusService from '@modules/stimulus/services/CreateStimulusService';
import ListStimulusService from '@modules/stimulus/services/ListStimulusService';

export default class StimulusController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { level } = request.query;

    const listStimulus = container.resolve(ListStimulusService);

    const levelNumber = Number(level);

    const stimulusList = await listStimulus.execute({
      level: levelNumber,
    });

    return response.json(stimulusList);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { word, syllabic_type } = request.body;

    const imageFilename = request.file.filename;

    const createStimulus = container.resolve(CreateStimulusService);

    const stimulus = await createStimulus.execute({
      word,
      imageFilename,
      syllabic_type,
    });

    return response.json(stimulus);
  }
}
