import React from 'react';
import Mpp from './Mppp';
import MyPageForm from './MyPageForm';

export default function SideMenuContent({ sideMenu, userInfo, setUserInfo }) {
  const { myHome, myPost, myHeart } = sideMenu;

  return (
    <div className='lg:w-2/3 w-full h-full box-border px-8 '>
      <div className='w-full h-full'>
        {myHome ? (
          <div className='space-y-3'>
            <div className='mt-3 text-blue-900 font-semibold lg:text-4xl text-2xl '>
              MY 홈
            </div>
            <div className='py-5 flex flex-col justify-center items-center '>
              <MyPageForm userInfo={userInfo} setUserInfo={setUserInfo} />
            </div>
          </div>
        ) : (
          <div />
        )}
        {myHeart ? (
          <div className='space-y-3'>
            <div className='mt-3 mb-8 font-semibold lg:text-3xl text-2xl '>
              내가 찜한 게시물
            </div>
            <div className='w-full lg:overflow-hidden overflow-visible lg:overflow-y-scroll overflow-y-visible h-[60vw] grid sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 grid-cols-1 gap-4'>
              <Mpp postLists={userInfo.likedPost} />
            </div>
          </div>
        ) : (
          <div />
        )}
        {myPost ? (
          <div className='space-y-3'>
            <div className='mt-3 font-semibold lg:text-3xl text-2xl'>
              내가 작성한 게시물
            </div>
            <Mpp postLists={userInfo.writedPost} />
          </div>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
