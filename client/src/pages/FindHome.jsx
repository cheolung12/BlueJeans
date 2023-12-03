import React, { useState } from 'react';
import Map from '../components/home/Map';
import AddressButton from '../components/home/AddressButton';
import Info from '../components/home/Info';

import { Link } from 'react-router-dom';
export default function FindHome() {
  const [userAddress, setUserAddress] = useState('');

  return (
    <>
      <div className=' w-full justify-end '>
        <div className=''>
          <div className='md:flex justify-end h-[650px]'>
            <div class='flex flex-col space-y-4'>
              <Info className=' hidden md:block pb-7'></Info>
              <Map userAddress={userAddress}></Map>
            </div>
            <AddressButton
              setUserAddress={setUserAddress}
              className='h-20 w-20 bg-red-600'
            ></AddressButton>
          </div>
        </div>
      </div>
    </>
  );
}
