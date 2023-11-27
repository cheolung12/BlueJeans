import React, { useState } from 'react';
import { FaQuestionCircle } from 'react-icons/fa';

const Info = () => {
  const [isToolTipVisible, setToolTipVisible] = useState(false);

  const toggleToolTip = () => {
    setToolTipVisible(!isToolTipVisible);
  };

  return (
    <div className='relative flex justify-items-end justify-end pr-3 w-[31rem] self-end mt-4'>
      <button onClick={toggleToolTip} className='w-7 h-7 text-[#2e375d]'>
        <FaQuestionCircle className='h-10 w-10 flex items-center' />
        {!isToolTipVisible && (
          <div className='absolute left-0 top-1/2 drop-shadow-md transform rounded-lg -translate-y-1/2 p-3 bg-green-200  shadow'>
            <div className='relative text-black'>
              <div className='absolute w-4 h-4  bg-green-200 -top-1 left-full ml-1 transform rotate-45 '></div>
              집으로 가는 길이 궁금하신가요? 오른쪽에 집모양 버튼을 눌러주세요
            </div>
          </div>
        )}
      </button>
    </div>
  );
};

export default Info;
