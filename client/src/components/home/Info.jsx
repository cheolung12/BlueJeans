import React, { useState } from 'react';
import { FaQuestionCircle } from 'react-icons/fa';
import HowToUse from './HowToUse';

const Info = () => {
  const [isToolTipVisible, setToolTipVisible] = useState(false);

  const toggleToolTip = () => {
    setToolTipVisible(!isToolTipVisible);
  };

  return (
    <div className='relative flex justify-items-start justify-end w-[15rem] pr-4 self-end mt-4 pb-12'>
      <button
        onClick={toggleToolTip}
        className='w-7 h-7 text-[#2e375d] relative z-10'
      >
        <FaQuestionCircle className='h-10 w-10 md:flex items-center' />
        {isToolTipVisible && (
          <div className='absolute right-full mt-2 text-black z-50'>
            <div className='z-20'>
              <HowToUse />
            </div>
          </div>
        )}
      </button>
    </div>
  );
};

export default Info;
