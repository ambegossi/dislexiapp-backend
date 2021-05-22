interface ISpeechRecognitionConfig {
  driver: 'google';

  config: {
    google: {
      recognitionConfig: {
        encoding: number;
        sampleRateHertz: number;
        languageCode: string;
        model: string;
        speechContexts: [
          {
            phrases: string[];
          },
        ];
      };
    };
  };
}

export default {
  driver: process.env.SPEECH_TO_TEXT_DRIVER,

  config: {
    google: {
      recognitionConfig: {
        encoding: 1,
        languageCode: 'pt-BR',
        model: 'command_and_search',
      },
    },
  },
} as ISpeechRecognitionConfig;
