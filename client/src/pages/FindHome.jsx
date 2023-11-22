import React, { useState } from 'react';
import Map from '../components/home/Map';
import AddressButton from '../components/home/AddressButton';

export default function FindHome() {
  const [userAddress, setUserAddress] = useState('');

  return (
    <div>
      <AddressButton setUserAddress={setUserAddress}></AddressButton>
      <Map userAddress={userAddress}></Map>
    </div>
  );
}
