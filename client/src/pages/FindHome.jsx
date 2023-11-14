import React from 'react';
import Map from '../components/home/Map';
import AddressButton from '../components/home/AddressButton';

export default function FindHome() {
  return (
    <div>
      <AddressButton></AddressButton>
      <Map></Map>
    </div>
  );
}
