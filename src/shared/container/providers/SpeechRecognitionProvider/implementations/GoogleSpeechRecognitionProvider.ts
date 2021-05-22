import path from 'path';
import fs from 'fs';
import speech, { SpeechClient } from '@google-cloud/speech';

import uploadConfig from '@config/upload';
import speechRecognitionConfig from '@config/speech-recognition-config';
import ISpeechRecognitionProvider from '../models/ISpeechRecognitionProvider';

class GoogleSpeechRecognitionProvider implements ISpeechRecognitionProvider {
  private client: SpeechClient;

  constructor() {
    this.client = new speech.SpeechClient();
  }

  public async recognize(
    audioFilename: string,
    expectedTranscript: string,
  ): Promise<string | null | undefined> {
    const originalPath = path.resolve(uploadConfig.tmpFolder, audioFilename);

    const audioContent = await fs.promises.readFile(originalPath);

    const audioBytes = audioContent.toString('base64');

    const audioFile = {
      content: audioBytes,
    };

    const config = speechRecognitionConfig.config.google.recognitionConfig;

    config.speechContexts = [
      {
        phrases: [expectedTranscript],
      },
    ];

    const request = {
      audio: audioFile,
      config,
    };

    const [response] = await this.client.recognize(request);

    const { results } = response;

    await fs.promises.unlink(originalPath);

    if (
      !results ||
      results.length === 0 ||
      !results[0].alternatives ||
      results[0].alternatives.length === 0
    ) {
      return null;
    }

    const transcription = results[0].alternatives[0].transcript;

    return transcription;
  }
}

export default GoogleSpeechRecognitionProvider;
