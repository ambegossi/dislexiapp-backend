import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListStimulusNARService from '@modules/stimulus/services/ListStimulusNARService';
import RecognizeStimulusService from '@modules/stimulus/services/RecognizeStimulusService';

export default class StimulusNARController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { profile_id } = request.params;

    const { number } = request.query;

    const listStimulusNAR = container.resolve(ListStimulusNARService);

    const stimulusList = await listStimulusNAR.execute({
      profile_id,
      number: Number(number),
    });

    return response.json(classToClass(stimulusList));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { word } = request.body;

    const audioFilename = request.file.filename;

    const recognizeStimulus = container.resolve(RecognizeStimulusService);

    const recognition = await recognizeStimulus.execute({
      stimulusWord: word,
      audioFilename,
    });

    return response.json(recognition);
  }
}
