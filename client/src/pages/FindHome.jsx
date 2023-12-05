import React, { useState } from 'react';
import Map from '../components/home/Map';
import AddressButton from '../components/home/AddressButton';
import Info from '../components/home/Info';
import Main from '../components/main/MainLast.css';
export default function FindHome() {
  const [userAddress, setUserAddress] = useState('');

  return (
    <>
      <div className=' w-full flex lg:justify-end justify-center lg:mr-10 mr-0'>
        <div className='flex flex-col space-y-4 xl:w-[1000px] lg:w-3/4 w-2/3'>
          <div className='flex justify-between w-full'>
            <AddressButton
              setUserAddress={setUserAddress}
              className='btn'
            ></AddressButton>
            <Info></Info>
          </div>
          <Map userAddress={userAddress}></Map>
        </div>
      </div>
    </>
  );
}
