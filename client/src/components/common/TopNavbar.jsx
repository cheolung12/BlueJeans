import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function TopNavbar() {
  const handleLogout = async () => {
    const res = await axios({
      method: 'GET',
      url: 'http://localhost:8080/api/logout',
      withCredentials: true,
    });
    if (res.data === 'redirect:/login') {
      sessionStorage.clear();
      window.location.reload();
    } else {
      console.log('로그아웃 실패!');
    }
  };

  return (
    <nav className='bg-white fixed w-full top-0 z-99'>
      <div className='flex flex-wrap justify-between items-center mx-auto max-w-screen-xl py-4 px-4'>
        <Link
          to='/'
          className='flex items-center space-x-3 rtl:space-x-reverse'
        >
          <img
            src='https://flowbite.com/docs/images/logo.svg'
            className='h-8'
            alt='Flowbite Logo'
          />
          <span className='self-center sm:text-4xl text-2xl  font-semibold whitespace-nowrap dark:text-white'>
            BlueJeans
          </span>
        </Link>
        <div className='flex items-center space-x-6 rtl:space-x-reverse'>
          {!sessionStorage.getItem('isLogin') ? (
            <Link
              to='/signup'
              className='sm:text-xl text-md font-semibold  text-black hover:underline'
            >
              회원가입
            </Link>
          ) : (
            <Link
              to='/mypage'
              className='sm:text-xl text-md font-semibold  text-black hover:underline'
            >
              마이페이지
            </Link>
          )}
          {!sessionStorage.getItem('isLogin') ? (
            <Link
              to='/login'
              className='sm:text-xl text-md font-semibold  text-black hover:underline'
            >
              로그인
            </Link>
          ) : (
            <div
              onClick={handleLogout}
              className='sm:text-xl text-md font-semibold  text-black hover:underline cursor-pointer'
            >
              로그아웃
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
