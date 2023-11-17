import React from 'react';

export default function ChatContent({ chatMessages, name }) {

  return (
    <>
      {chatMessages.map((message, index) => (
        <div key={index} className='mb-2'>
          {!message.isMine && (
            <div className='flex items-end m-2'>
              <div className='border rounded-full w-10 h-10'></div>
              <div className='ml-2'>{name}</div>
            </div>
          )}
          <div
            style={{ width: 'fit-content' }}
            className={`text-white rounded-md py-1 px-2 
               ${
                 message.isMine
                   ? 'bg-gray-800 rounded-tr-none ml-auto mr-2'
                   : 'bg-green-800 rounded-tl-none mr-auto ml-10'
               }`}
          >
            {message.text}
          </div>
        </div>
      ))}
    </>
  );
}
