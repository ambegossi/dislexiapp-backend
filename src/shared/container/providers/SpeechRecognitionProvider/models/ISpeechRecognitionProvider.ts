export default interface ISpeechRecognitionProvider {
  recognize(
    audioFilename: string,
    expectedTranscript: string,
  ): Promise<string | null | undefined>;
}
