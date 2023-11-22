import React from 'react';

export default function ChatContent({ chatMessages, name }) {
  // 줄바꿈 함수 추가
  const LineChange = (text) => {
    if (text.length > 25) {
      const firstPart = text.slice(0, 25);
      const secondPart = text.slice(25);
      return (
        <>
          {firstPart}
          <br />
          {secondPart}
        </>
      );
    } else {
      return text;
    }
  };

  return (
    <>
      {chatMessages.map((message, index) => (
        <div key={index} className='mb-2 backInUp'>
          {!message.isMine && (
            <div className='flex items-end m-2'>
              <div
                className='border rounded-full w-10 h-10'
                style={{
                  backgroundImage: `url(/Asong.jpg)`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              ></div>
              <div className='ml-2'>{name}</div>
            </div>
          )}
          <div
            style={{ width: 'fit-content' }}
            className={`text-white rounded-md py-2 px-2 mb-2 sm:text-xl text-md
               ${
                 message.isMine
                   ? 'bg-gray-800 rounded-tr-none ml-auto mr-2'
                   : 'bg-chatColor rounded-tl-none mr-auto ml-10'
               }`}
          >
            {LineChange(message.text)}
          </div>
        </div>
      ))}
    </>
  );
}
