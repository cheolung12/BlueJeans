import React, { useState } from 'react';
import { FaQuestionCircle } from 'react-icons/fa';

const Info = () => {
  const [isToolTipVisible, setToolTipVisible] = useState(false);

  const toggleToolTip = () => {
    setToolTipVisible(!isToolTipVisible);
  };

  return (
    <div className='relative flex justify-items-end justify-end '>
      <button onClick={toggleToolTip}>
        <FaQuestionCircle className='h-7 w-7 rounded-full bg-gray-100 flex items-center' />
      </button>

      {isToolTipVisible && (
        <div className='absolute left-0 top-1/2 transform -translate-y-1/2 p-3 rounded-lg bg-green-200  shadow'>
          이 페이지는 현 위치를 기반으로 집으로 가는 길의 경로를 알려줘는 페이지
          입니다! 옆에 있는 집모양 그림을 눌려보세요!
        </div>
      )}
    </div>
  );
};

export default Info;
