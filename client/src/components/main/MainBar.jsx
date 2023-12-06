import React from 'react';

import { Link } from 'react-router-dom';

//////////
import { IoMdBriefcase } from 'react-icons/io';
import { FaBookOpen } from 'react-icons/fa6';
import { FaPenNib } from 'react-icons/fa6';
import { MdChat } from 'react-icons/md';
import { IoHome } from 'react-icons/io5';
/////////
const MainBar = () => {
  return (
    <div className='flex items-end justify-center w-full h-full pl-4 pr-4'>
      <div className='rounded-[30px] shadow-lg items-center justify-around z-20 flex bg-white w-full md:w-3/4 mb-4 md:mb-20 text-sm md:text-lg md:px-6 px-4 md:py-9 py-6'>
        <Link
          to='/recruitment'
          className='w-full md:w-1/5 mb-2 md:mb-0  transition-transform hover:ease-linear transform hover:scale-105'
        >
          <div className='flex flex-col items-center'>
            <IoMdBriefcase className='h-8 w-8 sm:h-12 md:h-14 sm:w-12 md:w-14 text-[#FE8080] mb-1 ' />
            <p className='font-bold mt-1'>일자리</p>
          </div>
        </Link>

        <Link
          to='/ebook'
          className='w-full md:w-1/5 mb-2 md:mb-0  transition-transform hover:ease-linear transform hover:scale-105'
        >
          <div className='flex flex-col items-center'>
            <FaBookOpen className='h-8 w-8 sm:h-12 md:h-14 sm:w-12 md:w-14 text-[#FED001] mb-1' />
            <p className='font-bold mt-1'>전자책</p>
          </div>
        </Link>

        <Link
          to='/essay'
          className='w-full md:w-1/5 mb-2 md:mb-0 transition-transform hover:ease-linear transform hover:scale-105'
        >
          <div className='flex flex-col items-center'>
            <FaPenNib className='h-8 w-8 sm:h-12 md:h-14 sm:w-12 md:w-14 text-[#5495B1] mb-1' />
            <p className='font-bold mt-1'>백일장</p>
          </div>
        </Link>

        <Link
          to='/chat'
          className='w-full md:w-1/5 mb-2 md:mb-0 transition-transform hover:ease-linear transform hover:scale-105'
        >
          <div className='flex flex-col items-center'>
            <MdChat className='h-8 w-8 sm:h-12 md:h-14 sm:w-12 md:w-14 text-[#6694D5] mb-1' />
            <p className='font-bold mt-1'>챗봇</p>
          </div>
        </Link>

        <Link
          to='/findhome'
          className='w-full md:w-1/5 mb-2 md:mb-0 transition-transform hover:ease-linear transform hover:scale-105'
        >
          <div className='flex flex-col items-center'>
            <IoHome className='h-8 w-8 sm:h-12 md:h-14 sm:w-12 md:w-14 text-[#8D62E9] mb-1' />
            <p className='font-bold mt-1'>집찾기</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default MainBar;
