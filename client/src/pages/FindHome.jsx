import React, { useState } from 'react';
import Map from '../components/home/Map';
import AddressButton from '../components/home/AddressButton';
import Info from '../components/home/Info';

export default function FindHome() {
  const [userAddress, setUserAddress] = useState('');

  return (
    <>
      <div className=' w-full flex lg:justify-end justify-center lg:mr-10 mr-0'>
        <div className='flex flex-col space-y-4 xl:w-[1000px] lg:w-3/4 w-2/3'>
          <div className='flex justify-between w-full'>
            <AddressButton
              setUserAddress={setUserAddress}
              className='h-20 w-20 bg-red-600'
            ></AddressButton>
            <Info className=' hidden md:block pb-7'></Info>
          </div>
          <Map userAddress={userAddress}></Map>
        </div>
      </div>
    </>
  );
}
