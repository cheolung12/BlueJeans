import React from 'react';
import { RiHomeHeartFill } from 'react-icons/ri';
import { FaQuestionCircle } from 'react-icons/fa';

const HowToUse = () => {
  return (
    <div>
      <div className='text-xl font-medium '>
        <div
          style={{
            boxShadow: '13px -10px 10px -4px rgba(0, 0, 0, 0.28)',
            WebkitBoxShadow: '13px -10px 10px -4px rgba(0, 0, 0, 0.28)',
            MozBoxShadow: '13px -10px 10px -4px rgba(0, 0, 0, 0.28)',
          }}
          className='h-60 w-[500px] bg-blue-50 rounded-bl-2xl flex flex-col justify-center pt-4 pb-4'
        >
          <div className='h-1/5 flex items-center self-center'>
            <div className='h-1/5 items-center'>
              지금 보이는 빨간 점은 사용자의 현재위치입니다
            </div>
          </div>
          <div className='h-1/5 flex items-center self-center'>
            {' '}
            오른쪽에
            <RiHomeHeartFill className='ml-2 mr-2 h-5 w-5 animate-bounce' />
            버튼이 있습니다
          </div>
          <div className='h-1/5 flex items-center self-center'>
            <div className='h-1/5 items-center'>
              집으로 가는 가장 가까운 방법을 알려줘요
            </div>
          </div>
          <div className='h-1/5 flex items-center self-center'>
            <div className='h-1/5 items-center'>버튼을 눌러주세요</div>
          </div>
          <div className='h-1/5 flex items-center self-center'>
            준비가 되셨다면
            <FaQuestionCircle className='ml-2 w-4 h-4 mr-2 animate-bounce' />{' '}
            버튼을 눌러주세요
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowToUse;
