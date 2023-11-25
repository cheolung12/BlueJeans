import React from 'react';
import { RiHomeHeartFill } from 'react-icons/ri';

export default function AddressButton({ setUserAddress }) {
  const handleClick = () => {
    setUserAddress(' 서울특별시 마포구 염리동 숭문길 47');
  };

  return (
    <>
      <button onClick={handleClick} className=' w-30 text-[#2e375d]'>
        <RiHomeHeartFill className=' w-36 h-20 drop-shadow-md' />
        <p className=' text-lg text-black font-bold'>집찾기</p>
      </button>
    </>
  );
}
