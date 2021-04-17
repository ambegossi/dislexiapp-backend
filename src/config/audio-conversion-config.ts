interface IAudioConversionConfig {
  driver: 'ffmpeg';
}

export default {
  driver: process.env.AUDIO_CONVERSION_DRIVER,
} as IAudioConversionConfig;
