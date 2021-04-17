export default interface ISpeechRecognitionProvider {
  recognize(audioFilename: string): Promise<string | null | undefined>;
}
