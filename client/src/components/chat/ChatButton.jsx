import React from 'react';
import { FiSend } from 'react-icons/fi';

export default function ChatButton({ inputText, handleSendClick, enterKeyPressed }) {
  return (
    <div
      onClick={handleSendClick}
      className={`flex flex-col justify-center items-center w-1/6 h-full border rounded-md py-2 shadow-md box-border 
      hover:text-chatColor hover:border-chatColor hover:border-2
      active:bg-chatColor active:text-white
      ${enterKeyPressed && 'bg-chatColor text-white'}
      ${inputText ? 'text-chatColor border-chatColor border-2' : 'text-slate-600 '}`}
      
    > 
      <FiSend className='text-3xl mb-1.5'/> 
      <div className='text-sm  font-semibold'>전송</div>
    </div>
  );
}
