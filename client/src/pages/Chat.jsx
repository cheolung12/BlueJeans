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

            inputRef.current.style.outline = '2px solid red';

            setTimeout(() => {
                inputRef.current.style.outline = '';
            }, 2000);
            return;
        }

        setIsLoading(true);
        const newChatMessages = [...chatMessages, { text: inputText, isMine: true }];
        setChatMessages(newChatMessages);
        setInputText('');

        // 이전 대화 저장
        const previousConversation = chatMessages.map((message) => message.text);

        // 챗봇에게 응답 받아와서 추가
        try {
            const response = await axios({
                method: 'POST',
                url: `${process.env.REACT_APP_SERVER}/chat/question`,
                data: {
                    question: inputText,
                    previousConversation,
                },
            });
            console.log(response.data);
            const responseText = response.data.choices[0].text.replace(/\n/g, '').replace('진수: ', ''); // 형식 맞추기
            const updatedChatMessages = [...newChatMessages, { text: responseText, isMine: false }];
            setChatMessages(updatedChatMessages);
        } catch (error) {
            console.log('전송 오류: ', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col pl-0 lg:pl-[196px] w-[94%]">
            <div
                className="w-full h-72 relative rounded-3xl"
                style={{
                    backgroundImage: 'url("https://bluejeansbucket2.s3.ap-northeast-2.amazonaws.com/user/chatBanner.jpg")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <div
                    className="w-full h-full flex justify-center items-center md:items-start absolute inset-0 overflow-hidden rounded-3xl"
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
                >
                    <div className="flex flex-col justify-start w-full pl-0 md:pl-6 pt-6">
                        <div className="text-white text-3xl md:text-5xl text-center md:text-start font-bold pb-3 animate__animated animate__fadeInDown ">
                            인공지능 내 친구,
                        </div>
                        <div className="text-white text-xl md:text-3xl text-center md:text-start animate__animated animate__fadeInDown">
                            진수와 대화하기!
                        </div>
                    </div>
                </div>
            </div>

            <br />
            <br />

            <div className="w-full flex justify-center items-center fade-in">
                {/* content wrapper */}
                <div className="xl:w-[950px] lg:w-3/4 w-full 2xl:h-[800px] h-[600px] shadow-xl flex flex-col justify-between">
                    <div className="h-full overflow-auto flex flex-col-reverse bg-slate-100 rounded-md">
                        <ChatBox inputText={inputText} chatMessages={chatMessages} isLoading={isLoading} />
                    </div>
                    {/* input wrapper */}
                    <div className="flex justify-end lg:h-1/6 md:h-20 ">
                        <ChatInput
                            inputText={inputText}
                            setInputText={setInputText}
                            handleSendClick={handleSendClick}
                            inputRef={inputRef}
                            setEnterKeyPressed={setEnterKeyPressed}
                        />
                        <ChatButton inputText={inputText} handleSendClick={handleSendClick} enterKeyPressed={enterKeyPressed} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatApp;
