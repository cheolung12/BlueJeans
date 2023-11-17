import React, { useState, useRef } from 'react';
import axios from 'axios';
import ChatBox from '../components/chat/ChatBox';
import ChatInput from '../components/chat/ChatInput';
import ChatButton from '../components/chat/ChatButton';

const ChatApp = () => {
  const [inputText, setInputText] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // 말줄임표 표시용
  const inputRef = useRef(null); // input focus를 위한 ref
  const [enterKeyPressed, setEnterKeyPressed] = useState(false); //enter키 입력 시 버튼 스타일 변화

  const handleSendClick = async () => {
    // 빈 값 예외처리
    if (inputText.trim() === '') {
      inputRef.current.focus();
      inputRef.current.style.outline = '2px solid red'
      setTimeout(() => {
        inputRef.current.style.outline = '';
      }, 2000);
      return;
    }

    setIsLoading(true);
    const newChatMessages = [
      ...chatMessages,
      { text: inputText, isMine: true },
    ];
    setChatMessages(newChatMessages);
    setInputText('');

    // 이전 대화 저장
    const previousConversation =
      chatMessages.length >= 4
        ? chatMessages.slice(-4).map((message) => message.text)
        : chatMessages.map((message) => message.text);

    // 챗봇에게 응답 받아와서 추가
    try {
      const response = await axios({
        method: 'POST',
        url: 'http://localhost:8080/chat-gpt/question',
        data: {
          question: inputText,
          previousConversation,
        },
      });

      const responseText = response.data.choices[0].text
        .replace(/\n/g, '')
        .replace('A: ', ''); // 형식 맞추기
      const updatedChatMessages = [
        ...newChatMessages,
        { text: responseText, isMine: false },
      ];
      setChatMessages(updatedChatMessages);
    } catch (error) {
      console.log('전송 오류: ', error);
    } finally {
      setIsLoading(false);
      console.log(previousConversation);
    }
  };

  return (
    <div className='flex justify-center'>
      {/* content wrapper */}
      <div className='w-3/5'>
        <ChatBox
          inputText={inputText}
          chatMessages={chatMessages}
          isLoading={isLoading}
        />
        {/* input wrapper */}
        <div className='flex justify-end'>
          <ChatInput
            inputText={inputText}
            setInputText={setInputText}
            handleSendClick={handleSendClick}
            inputRef={inputRef}
            setEnterKeyPressed={setEnterKeyPressed}
          />
          <ChatButton
            inputText={inputText}
            handleSendClick={handleSendClick}
            enterKeyPressed={enterKeyPressed}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
