import React from 'react';

import { Link } from 'react-router-dom';

//////////
import { IoMdBriefcase } from 'react-icons/io';
import { FiBookOpen } from 'react-icons/fi';
import { FaPenNib } from 'react-icons/fa6';
import { MdChat } from 'react-icons/md';
import { GoHome } from 'react-icons/go';
/////////
const MainBar = () => {
  return (
    <div>
      <div className='flex items-end justify-center h-full pl-4 pr-4'>
        <div className='rounded-[30px] shadow-lg items-center z-20 flex justify-around bg-white w-full max-md:pt-4 md:w-3/4 mb-4 md:h-36 md:mb-24 text-sm md:text-lg'>
          <Link
            to='/recruitment'
            className='w-full md:w-1/5 mb-2 md:mb-0  transition-transform hover:ease-linear transform hover:scale-105'
          >
            <div className='flex flex-col items-center'>
              <IoMdBriefcase className='h-8 md:h-12 w-8 md:w-12 text-[#FE8080]' />
              <p className='font-bold mt-1'>일자리</p>
            </div>
          </Link>

          <Link
            to='/ebook'
            className='w-full md:w-1/5 mb-2 md:mb-0  transition-transform hover:ease-linear transform hover:scale-105'
          >
            <div className='flex flex-col items-center'>
              <FiBookOpen className='h-8 md:h-12 w-8 md:w-12 text-[#FED001]' />
              <p className='font-bold mt-1'>전자책</p>
            </div>
          </Link>

          <Link
            to='/essay'
            className='w-full md:w-1/5 mb-2 md:mb-0 transition-transform hover:ease-linear transform hover:scale-105'
          >
            <div className='flex flex-col items-center'>
              <FaPenNib className='h-8 md:h-12 w-8 md:w-12 text-[#5495B1]' />
              <p className='font-bold mt-1'>백일장</p>
            </div>
          </Link>

          <Link
            to='/chat'
            className='w-full md:w-1/5 mb-2 md:mb-0 transition-transform hover:ease-linear transform hover:scale-105'
          >
            <div className='flex flex-col items-center'>
              <MdChat className='h-8 md:h-12 w-8 md:w-12 text-[#6694D5]' />
              <p className='font-bold mt-1'>챗봇</p>
            </div>
          </Link>

          <Link
            to='/findhome'
            className='w-full md:w-1/5 mb-2 md:mb-0 transition-transform hover:ease-linear transform hover:scale-105'
          >
            <div className='flex flex-col items-center'>
              <GoHome className='h-8 md:h-12 w-8 md:w-12 text-[#8D62E9]' />
              <p className='font-bold mt-1'>집찾기</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainBar;
