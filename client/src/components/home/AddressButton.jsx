import React from 'react';
import { FcHome } from 'react-icons/fc';

export default function AddressButton({ setUserAddress }) {
  const handleClick = () => {
    setUserAddress('서울특별시 송파구 법원로 55');
  };

  return (
    <>
      <button onClick={handleClick}>
        <FcHome />
      </button>
    </>
  );
}
