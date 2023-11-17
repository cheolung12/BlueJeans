import React from 'react';

export default function ChatInput({ inputText, setInputText, handleSendClick, inputRef, setEnterKeyPressed }) {

  return (
    <input
      ref={inputRef}
      className='w-3/4 rounded-sm border focus:outline-none shadow-md'
      placeholder='메세지를 입력해주세요.'
      value={inputText}
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
  );
}
