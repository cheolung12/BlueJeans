import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const useSpeechToText = () => {
  // transcript: 현재까지 인식된 음성을 텍스트로 변환한 결과 
  // listening: 현재 음성 인식이 활성화되어 있는지를 나타내는 boolean 값
  const { transcript, listening } = useSpeechRecognition();

  const toggleListening = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      SpeechRecognition.startListening({ language: 'ko-KR', continuous: true });
    }
  }

  return { transcript, listening, toggleListening };
};

export default useSpeechToText;