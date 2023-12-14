import React from 'react';
import { RiHomeHeartFill } from 'react-icons/ri';
import axios from 'axios';

export default function AddressButton({ setUserAddress }) {
  const isLogin = localStorage.getItem('isLogin');

  const handleClick = async () => {
    if (isLogin) {
      try {
        const response = await axios({
          method: 'POST',
          url: `${process.env.REACT_APP_SERVER}/findhome`,
          withCredentials: true,
        });

        setUserAddress(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        alert('로그인이 필요합니다.');
        window.location.href = '/login';
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <div className='items-center'>
        <button onClick={handleClick} className='btn'>
          <RiHomeHeartFill className=' h-12 w-full' />
          <p className='text-lg text-black font-bold'>집찾기</p>
        </button>
      </div>
    </>
  );
}
