import React from 'react';
import { FcHome } from 'react-icons/fc';

export default function AddressButton({ setUserAddress }) {
  const handleClick = () => {
    setUserAddress('서울특별시 송파구 송파대로 111');
  };

  return (
    <>
      <button onClick={handleClick}>
        <FcHome />
      </button>
    </>
  );
}
