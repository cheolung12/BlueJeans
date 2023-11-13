import React, { useState } from 'react';
import axios from 'axios';
import ChatBox from '../components/chat/ChatBox';
import ChatInput from '../components/chat/ChatInput';
import ChatButton from '../components/chat/ChatButton';

const ChatApp = () => {
  const [inputText, setInputText] = useState('');
  const [chatMessages, setChatMessages] = useState([]);

  const handleSendClick = async () => {
    const newChatMessages = [...chatMessages, { text: inputText, isMine: true }];
    setChatMessages(newChatMessages);
    setInputText('');

    const response = await axios({
      method: 'POST',
      url: 'http://localhost:8080/chat-gpt/question',
      data: {question: inputText},
    })
    console.log(response);
    const responseText = response.data.choices[0].text;
    const updatedChatMessages = [...newChatMessages, { text: responseText, isMine: false }];
    setChatMessages(updatedChatMessages);
  };
  
  return (
    <div className='w-full'>
      <ChatBox chatMessages={chatMessages}/>
      <ChatInput inputText={inputText} setInputText={setInputText} handleSendClick={handleSendClick}/>
      <ChatButton handleSendClick={handleSendClick} />
    </div>
  );
};

export default ChatApp;
