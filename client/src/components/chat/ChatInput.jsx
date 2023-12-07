import React, { useEffect } from 'react';
import useSpeechToText from '../../hooks/useSpeechToText';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';

export default function ChatInput({
  inputText,
  setInputText,
  handleSendClick,
  inputRef,
  setEnterKeyPressed,
}) {
  const { transcript, listening, toggleListening, resetTranscript } =
    useSpeechToText();

  useEffect(() => {
    if (listening) {
      setInputText(transcript);
      inputRef.current.focus();
    }
  }, [transcript, listening, setInputText, inputRef]);

  return (
    <div className='border w-full h-full flex shadow-md rounded- px-2.5 py-2 sm:text-lg text-sm rounded-sm'>
      <textarea
        ref={inputRef}
        className='w-5/6 focus:outline-none py-2 resize-none'
        placeholder='메세지를 입력해주세요.'
        value={listening ? transcript : inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
            e.preventDefault();
            setEnterKeyPressed(true);
            if (listening) {
              resetTranscript();
            }
            handleSendClick();
          }
        }}
        onKeyUp={(e) => {
          if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
            setEnterKeyPressed(false);
          }
        }}
      />
      <div
        onClick={toggleListening}
        className='flex flex-col justify-center items-center lg:w-1/6 w-1/4  text-slate-600 py-2 cursor-pointer hover:text-chatColor'
      >
        {listening ? (
          <FontAwesomeIcon
            icon={faMicrophone}
            fade
            className='mb-2 text-chatColor lg:text-3xl text-2xl'
          />
        ) : (
          <FontAwesomeIcon icon={faMicrophone} className='mb-2 lg:text-4xl text-2xl' />
        )}
        <div
          className={` w-full text-center lg:text-lg md:text-md sm:text-sm font-semibold ${listening && 'text-chatColor'} sm:block hidden`}
        >
          {listening ? '음성인식 중지' : '음성인식 시작'}
        </div>
      </div>
    </div>
  );
}
