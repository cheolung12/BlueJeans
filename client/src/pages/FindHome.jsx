import React, { useState } from 'react';
import Map from '../components/home/Map';
import AddressButton from '../components/home/AddressButton';
import Info from '../components/home/Info';
import { IoMdBriefcase } from 'react-icons/io';
import { FiBookOpen } from 'react-icons/fi';
import { FaPenNib } from 'react-icons/fa6';
import { MdChat } from 'react-icons/md';
import { GoHome } from 'react-icons/go';

import { Link } from 'react-router-dom';
export default function FindHome() {
  const [userAddress, setUserAddress] = useState('');

  return (
    <div>
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
  );
}
