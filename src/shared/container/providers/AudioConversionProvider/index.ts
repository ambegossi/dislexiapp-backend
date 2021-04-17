import { container } from 'tsyringe';
import audioConversionConfig from '@config/audio-conversion-config';

import IAudioConversionProvider from './models/IAudioConversionProvider';

import FFmpegAudioConversionProvider from './implementations/FFmpegAudioConversionProvider';

const providers = {
  ffmpeg: FFmpegAudioConversionProvider,
};

container.registerSingleton<IAudioConversionProvider>(
  'AudioConversionProvider',
  providers[audioConversionConfig.driver],
);
