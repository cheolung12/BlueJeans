import React from 'react';
import { FiSend } from 'react-icons/fi';

export default function ChatButton({ handleSendClick }) {
  return (
    <a
      onClick={handleSendClick}
      className='relative inline-flex items-center px-2 py-2 overflow-hidden text-lg font-medium text-indigo-600 border-2 border-indigo-600 rounded-full hover:text-white group hover:bg-gray-50 '
    >
      <span className='absolute left-0 block w-full h-0 transition-all bg-indigo-600 opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease'></span>
      <span className='absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease'></span>
      <span className='relative'>
        <FiSend />
      </span>
    </a>
  );
}
