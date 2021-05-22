import { injectable, inject } from 'tsyringe';
import path from 'path';

import ISpeechRecognitionProvider from '@shared/container/providers/SpeechRecognitionProvider/models/ISpeechRecognitionProvider';
import IAudioConversionProvider from '@shared/container/providers/AudioConversionProvider/models/IAudioConversionProvider';

import uploadConfig from '@config/upload';

interface IRequest {
  stimulusWord: string;
  audioFilename: string;
}

interface IResponse {
  recognition: {
    transcription: string;
    stimulusWord: string;
    isCorrect: boolean;
  } | null;
  recognized: boolean;
}

@injectable()
class RecognizeStimulusService {
  constructor(
    @inject('SpeechRecognitionProvider')
    private speechRecognitionProvider: ISpeechRecognitionProvider,

    @inject('AudioConversionProvider')
    private audioConversionProvider: IAudioConversionProvider,
  ) {}

  public async execute({
    stimulusWord,
    audioFilename,
  }: IRequest): Promise<IResponse | null> {
    const originalPath = path.resolve(uploadConfig.tmpFolder, audioFilename);

    const filenameWithoutExtension = audioFilename.split('.')[0];

    const output = `${uploadConfig.tmpFolder}/${filenameWithoutExtension}.wav`;

    await this.audioConversionProvider.convert(
      originalPath,
      'wav',
      'pcm_s16le',
      1,
      output,
    );

    const transcription = await this.speechRecognitionProvider.recognize(
      `${filenameWithoutExtension}.wav`,
      stimulusWord,
    );

    if (!transcription) {
      return {
        recognition: null,
        recognized: false,
      };
    }

    if (transcription.toLowerCase() !== stimulusWord.toLowerCase()) {
      return {
        recognition: {
          isCorrect: false,
          stimulusWord,
          transcription,
        },
        recognized: true,
      };
    }

    return {
      recognition: {
        isCorrect: true,
        stimulusWord,
        transcription,
      },
      recognized: true,
    };
  }
}

export default RecognizeStimulusService;
