import React from 'react';
import { Link } from 'react-router-dom';

export default function TopNavbar() {
  return (
    <nav class='bg-white fixed w-full top-0 z-99'>
      <div class='flex flex-wrap justify-between items-center mx-auto max-w-screen-xl py-4 px-4'>
        <Link
          to='/'
          class='flex items-center space-x-3 rtl:space-x-reverse'
        >
          <img
            src='https://flowbite.com/docs/images/logo.svg'
            class='h-8'
            alt='Flowbite Logo'
          />
          <span class='self-center sm:text-4xl text-2xl  font-semibold whitespace-nowrap dark:text-white'>
            BlueJeans
          </span>
        </Link>
        <div class='flex items-center space-x-6 rtl:space-x-reverse'>
              <Link
                to='/signup'
                class='sm:text-xl text-md font-semibold  text-black hover:underline'
              >
                회원가입
              </Link>
              <Link
                to='/login'
                class='sm:text-xl text-md font-semibold  text-black hover:underline'
              >
                로그인
              </Link>
        </div>
      </div>
    </nav>
  );
}
