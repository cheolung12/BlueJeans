import React from 'react';

export default function SideMenuList({ sideMenu, setSideMenu }) {
  const { myHome, myPost, myHeart } = sideMenu;

  const changeSideMenu = (type) => {
    setSideMenu((prev) => {
      const updatedMenu = {};

      // 모든 키에 대해 false로 설정
      Object.keys(prev).forEach((key) => {
        updatedMenu[key] = key === type ? !prev[key] : false;
      });

      return updatedMenu;
    });
  };

  return (
    <div className='w-full flex  flex-col lg:items-end items-center my-12 lg:space-y-4 space-y-2'>
      <div
        className={`px-4 py-2 text-blue-800 font-semibold lg:w-2/3 w-1/7 text-start  cursor-pointer ${
          myHome &&
          'bg-white lg:rounded-l-full rounded-l-full lg:rounded-r-none rounded-r-full'
        }`}
        onClick={() => changeSideMenu('myHome')}
      >
        MY 홈
      </div>
      <div
        className={`px-4 py-2 text-blue-800 font-semibold lg:w-2/3 w-1/7 text-start  cursor-pointer ${
          myHeart &&
          'bg-white lg:rounded-l-full rounded-l-full lg:rounded-r-none rounded-r-full'
        }`}
        onClick={() => changeSideMenu('myHeart')}
      >
        내가 찜한 게시물
      </div>
      <div
        className={`px-4 py-2 text-blue-800 font-semibold lg:w-2/3 w-1/7 text-start  cursor-pointer ${
          myPost &&
          'bg-white lg:rounded-l-full rounded-l-full lg:rounded-r-none rounded-r-full'
        }`}
        onClick={() => changeSideMenu('myPost')}
      >
        내가 작성한 게시물
      </div>
    </div>
  );
}
