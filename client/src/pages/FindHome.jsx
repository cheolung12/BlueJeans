import React, { useState } from 'react';
import Map from '../components/home/Map';
import AddressButton from '../components/home/AddressButton';
import Info from '../components/home/Info';
export default function FindHome() {
  const [userAddress, setUserAddress] = useState('');

  return (
    <>
      <div className='flex flex-col pl-[196px] w-[94%]'>
        <div
          className='w-full h-72 relative rounded-3xl'
          style={{
            backgroundImage:
              'url("https://bluejeansbucket2.s3.ap-northeast-2.amazonaws.com/ebook/KakaoTalk_Image_2023-12-04-22-08-30.jpeg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div
            className='w-full h-full flex justify-center absolute inset-0 overflow-hidden rounded-3xl'
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
          >
            <div className='flex flex-col justify-start w-full pl-6 pt-6'>
              <div className='text-white text-5xl font-bold pb-3 animate__animated animate__fadeInDown '>
                집찾기
              </div>
              <div className='text-white text-3xl animate__animated animate__fadeInDown'>
                굿
              </div>
            </div>
          </div>
        </div>

        <br />

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
      </div>
    </>
  );
}
