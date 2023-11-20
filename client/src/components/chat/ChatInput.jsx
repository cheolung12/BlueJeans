import React from 'react';
import useSpeechToText from '../../hooks/useSpeechToText';

export default function ChatInput({ inputText, setInputText, handleSendClick, inputRef, setEnterKeyPressed }) {
  const { transcript, listening, toggleListening } = useSpeechToText();
  const moveText = (transcript) => {
    setInputText(transcript);
  }

  console.log("transcript: ", transcript)
  return (
    <>
    <input
      ref={inputRef}
      className='w-3/4 rounded-sm border focus:outline-none shadow-md'
      placeholder='메세지를 입력해주세요.'
      value={listening ? transcript : inputText}
      onChange={(e) => setInputText(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
          setEnterKeyPressed(true);
          handleSendClick();
        }
      }}
      onKeyUp={(e) => {
        if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
          setEnterKeyPressed(false);
        }
      }}
    />
    <button onClick={toggleListening}>
        {listening ? '음성인식 중지' : '음성인식 시작'}
      </button>
    </>
  );
}
