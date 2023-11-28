import React, { useState } from 'react';
import Map from '../components/home/Map';
import AddressButton from '../components/home/AddressButton';
import Info from '../components/home/Info';

import { Link } from 'react-router-dom';
export default function FindHome() {
  const [userAddress, setUserAddress] = useState('');

  return (
    <div className='w-full justify-end '>
      <div className=''>
        <div className='flex justify-end h-[650px]'>
          <div class='flex flex-col space-y-4'>
            <Info></Info>
            <Map className='mb-0 p-6' userAddress={userAddress}></Map>
          </div>
          <AddressButton
            setUserAddress={setUserAddress}
            className='h-20 w-20'
          ></AddressButton>
        </div>
      </div>
    </div>
  );
}
