import React from 'react';
import ChatContent from './ChatContent';
import InitialMsg from './InitialMsg';
import Ellipsis from './Ellipsis';

export default function ChatBox({ inputText, chatMessages, isLoading }) {
  const NAME = '진수';

  return (
    // 높이 조정 필요!
    <div className='flex flex-col-reverse w-full h-96 border overflow-auto'>
      <div className='flex flex-col'>
        <InitialMsg name={NAME} />
        <ChatContent chatMessages={chatMessages} name={NAME} />
        <Ellipsis inputText={inputText} isLoading={isLoading} />
      </div>
    </div>
  );
}
