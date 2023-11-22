import React, { useState } from 'react';
import Map from '../components/home/Map';
import AddressButton from '../components/home/AddressButton';
import Navbar from '../pages/Navbar';

export default function FindHome() {
  const [userAddress, setUserAddress] = useState('');

  return (
    <div>
      <Navbar></Navbar>
      <AddressButton setUserAddress={setUserAddress}></AddressButton>
      <Map userAddress={userAddress}></Map>
    </div>
  );
}
