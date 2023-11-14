import React, { useState } from 'react';
import { FcHome } from 'react-icons/fc';

const yk = {
  position: '서울특별시 송파구 법원로 55',
};

export default function AddressButton() {
  const [userAddress, setUserAddress] = useState(null);
  const [endPosition, setEndPosition] = useState(null);

  const address = () => {
    setUserAddress(yk);
    setEndPosition(yk.position);
  };
  console.log('address', userAddress);

  console.log('end', endPosition);

  return (
    <>
      <button
        onClick={() => {
          address();
        }}
      >
        <FcHome />
      </button>
    </>
  );
}
