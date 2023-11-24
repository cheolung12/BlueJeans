import React, { useState } from 'react';
import Map from '../components/home/Map';
import AddressButton from '../components/home/AddressButton';
import Info from '../components/home/Info';
import { IoMdBriefcase } from 'react-icons/io';
import { FiBookOpen } from 'react-icons/fi';
import { FaPenNib } from 'react-icons/fa6';
import { MdChat } from 'react-icons/md';
import { GoHome } from 'react-icons/go';

import { Link } from 'react-router-dom';
export default function FindHome() {
  const [userAddress, setUserAddress] = useState('');

  return (
    <div>
      <div className=' flex justify-center'>
        <div className=' rounded-[30px] shadow-md items-center flex justify-around bg-white h-36 w-3/4 mt-12 mb-5 text-lg'>
          <Link to='/recruitment' className='justify-center'>
            <p className=' font-bold h-16 w-16 text-center'>
              <IoMdBriefcase className=' h-full w-full text-[#FE8080]' />
              일자리
            </p>
          </Link>

          <Link to='/ebook' className=''>
            <p className='font-bold h-16 w-16 text-center'>
              <FiBookOpen className='text-[#FED001]  h-full w-full' />
              e-book
            </p>
          </Link>

          <Link to='/essay' className=''>
            <p className=' font-bold h-16 w-16 text-center'>
              <FaPenNib className=' text-[#5495B1] h-full w-full' />
              백일장
            </p>
          </Link>
          <Link to='/chat' className=''>
            <p className=' font-bold h-16 w-16 text-center'>
              <MdChat className=' text-[#6694D5] h-full w-full' />
              챗봇
            </p>
          </Link>
          <Link to='/findhome' className=''>
            <p className=' font-bold h-16 w-16 text-center'>
              <GoHome className='text-[#8D62E9] h-full w-full' />
              집찾기
            </p>
          </Link>
        </div>
      </div>
      <div className='flex justify-center h-[650px]'>
        <AddressButton
          setUserAddress={setUserAddress}
          className='h-20 w-20'
        ></AddressButton>
        <div class='flex flex-col space-y-4'>
          <Info></Info>
          <Map className='mb-0 p-6' userAddress={userAddress}></Map>
        </div>
      </div>
    </div>
  );
}
