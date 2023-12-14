import React from 'react';
import { VscGithub } from 'react-icons/vsc';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <div className='w-full flex justify-center items-center'>
      <div className='border-t pt-12 mb-12 w-11/12 flex sm:justify-evenly justify-start mx-12'>
        <div className='text-gray-500 sm:text-base text-xs'>
          <div className='font-bold mr-2'>제작</div>
          <div className='mt-2'>김민재, 이영경, 전유민</div>
          <div className='mt-2'>마아송, 홍철웅</div>
          <Link
            to='https://github.com/cheolung12/BlueJeans'
            target='_blank'
            className='flex underline sm:text-2xl text-lg items-center mt-4'
          >
            <VscGithub className='mr-2' />
            Github Link
          </Link>
        </div>
        <div className='text-xl font-semibold sm:block hidden'>
          <div className='mb-1'>청춘은 바로 지금!</div>
          <div className='mb-2'>시니어를 위한 놀거리 플랫폼</div>
          <div className='text-base'>BlueJeans</div>
        </div>
      </div>
    </div>
  );
}
