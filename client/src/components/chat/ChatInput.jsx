import React from 'react';

export default function ChatInput({ inputText, setInputText, handleSendClick }) {
  return (
    <input
      className='rounded-sm border focus:outline-none'
      placeholder='메세지를 입력해주세요.'
      value={inputText}
      onChange={(e) => setInputText(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' &&  !e.nativeEvent.isComposing) {
          handleSendClick();
        }
      }}
    />
  );
}
