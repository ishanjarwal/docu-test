export interface SpeechRecognitionResult {
  isFinal: boolean;
  [key: number]: {
    transcript: string;
    confidence: number;
  };
}

export interface SpeechRecognitionEvent extends Event {
  results: {
    [key: number]: SpeechRecognitionResult;
    length: number;
  };
}

export interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message: string;
}
