import { container } from 'tsyringe';
import speechRecognitionConfig from '@config/speech-recognition-config';

import ISpeechRecognitionProvider from './models/ISpeechRecognitionProvider';

import GoogleSpeechRecognitionProvider from './implementations/GoogleSpeechRecognitionProvider';

const providers = {
  google: GoogleSpeechRecognitionProvider,
};

container.registerSingleton<ISpeechRecognitionProvider>(
  'SpeechRecognitionProvider',
  providers[speechRecognitionConfig.driver],
);
