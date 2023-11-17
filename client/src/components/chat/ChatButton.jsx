import React from 'react';
import { FiSend } from 'react-icons/fi';

export default function ChatButton({ inputText, handleSendClick, enterKeyPressed }) {
  return (
    <div
      onClick={handleSendClick}
      className={`${inputText && 'text-green-800 border-green-800'} 
      hover:text-green-800 hover:border-green-800
      active:bg-green-800 active:text-white 
      ${enterKeyPressed && 'bg-green-800 text-white'}
      flex justify-center items-center rounded-full border text-2xl px-4 py-4`}
    >
      <FiSend />
    </div>
  );
}
