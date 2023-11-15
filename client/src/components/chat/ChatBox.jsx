import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';

export default function ChatBox({ inputText, chatMessages, isLoading }) {
  const NAME = "진수";
  return (
    // 높이 조정 필요!
    <div className='flex flex-col-reverse w-full h-screen border overflow-auto'>
      <div className='flex flex-col'>
        {/* 초기 메시지 */}
        <div className='flex items-end m-2'>
          <div className='border rounded-full w-10 h-10'></div>
          <div className='ml-2'>{NAME}</div>
        </div>
        <div
          style={{ width: 'fit-content' }}
          className={
            'text-white rounded-md py-1 px-2 bg-green-800 rounded-tl-none mr-auto ml-10'
          }
        >
          안녕! 나는 {NAME}야! <br />
          궁금한게 있으면 뭐든지 물어봐
        </div>

        {/* 대화 내용 */}
        {chatMessages.map((message, index) => (
          <div key={index} className='mb-2'>
            {!message.isMine && (
              <div className='flex items-end m-2'>
                <div className='border rounded-full w-10 h-10'></div>
                <div className='ml-2'>{NAME}</div>
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

        {/* 입력중일때 말줄임표 표시 */}
        {(inputText || isLoading) && (
          <div
            className={`${inputText && 'ml-auto'} ${
              isLoading && 'mr-auto'
            } px-2 py-1`}
          >
            <FontAwesomeIcon icon={faEllipsis} fade size='3x' />
          </div>
        )}
      </div>
    </div>
  );
}
