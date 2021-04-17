export default interface IAudioConversionProvider {
  convert(
    input: string,
    format: string,
    audioCodec: string,
    audioChannels: number,
    output: string,
  ): Promise<string>;
}
