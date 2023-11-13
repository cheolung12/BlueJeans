import React from 'react';

export default function ChatBox({ chatMessages }) {
  return (
    <div className='w-3/4 h-60 border '>
      {chatMessages.map((message, index) => (
        <div key={index} className='mb-2'>
          <div
            style={{ width: 'fit-content' }}
            className={`text-white rounded-md py-1 px-2 
             ${
               message.isMine
                 ? 'bg-gray-800 rounded-tr-none ml-auto mr-2'
                 : 'bg-green-800 rounded-tl-none mr-auto ml-2'
             }`}
          >
            {message.text}
          </div>
        </div>
      ))}
    </div>
  );
}
