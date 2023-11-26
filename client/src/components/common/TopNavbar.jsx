import React from 'react';
import { Link } from 'react-router-dom';

export default function TopNavbar() {
  return (
      <nav class='bg-white border-gray-200 dark:bg-gray-900 mb-4'>
        <div class='flex flex-wrap justify-between items-center mx-auto max-w-screen-xl py-4 px-6'>
          <a
            href='https://flowbite.com'
            class='flex items-center space-x-3 rtl:space-x-reverse'
          >
            <img
              src='https://flowbite.com/docs/images/logo.svg'
              class='h-8'
              alt='Flowbite Logo'
            />
            <span class='self-center text-2xl font-semibold whitespace-nowrap dark:text-white'>
              BlueJeans
            </span>
          </a>
          <div class='flex items-center space-x-6 rtl:space-x-reverse'>
            <Link
              to='/login'
              class='text-md font-semibold    text-black dark:text-blue-500 hover:underline'
            >
              회원가입
            </Link>
            <Link
              to='/signup'
              class='text-md font-semibold  text-black dark:text-blue-500 hover:underline'
            >
              로그인
            </Link>
          </div>
        </div>
      </nav>
  );
}
