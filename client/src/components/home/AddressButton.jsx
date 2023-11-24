import React from 'react';
import { RiHomeHeartFill } from 'react-icons/ri';

export default function AddressButton({ setUserAddress }) {
  const handleClick = () => {
    setUserAddress(' 서울특별시 마포구 염리동 숭문길 47');
  };

  return (
    <>
      <button onClick={handleClick}>
        <RiHomeHeartFill className=' w-10 h-10' />
      </button>
    </>
  );
}
