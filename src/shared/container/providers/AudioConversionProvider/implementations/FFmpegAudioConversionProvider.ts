import ffmpeg from 'fluent-ffmpeg';
import fs from 'fs';

import IAudioConversionProvider from '../models/IAudioConversionProvider';

class FFmpegAudioConversionProvider implements IAudioConversionProvider {
  public async convert(
    input: string,
    format: string,
    audioCodec: string,
    audioChannels: number,
    output: string,
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      ffmpeg()
        .input(input)
        .format(format)
        .audioCodec(audioCodec)
        .audioChannels(audioChannels)
        .save(output)
        .on('err', async err => {
          await fs.promises.unlink(input);

          return reject(err);
        })
        .on('end', async () => {
          await fs.promises.unlink(input);

          return resolve(output);
        });
    });
  }
}

export default FFmpegAudioConversionProvider;
