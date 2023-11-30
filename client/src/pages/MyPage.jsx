import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { IoHome } from 'react-icons/io5';
import LikedPost from '../components/mypage/LikedPost';

export default function MyPage() {
  const { userId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios({
          method: 'GET',
          url: `${process.env.REACT_APP_SERVER}/mypage`,
          withCredentials: true,
        });
        console.log(res.data);
        const { nickname, address, likedPost, writedPost } = res.data;
      } catch (error) {
        console.log('fetch error', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='w-full'>
      {/* // userInfo */}
      <div className='w-full h-72 bg-slate-600 relative'>
        <div className='absolute -bottom-10 left-24 rounded-full w-24 h-24'>
          <img
            src='/images/jinsu.jpeg'
            alt='프로필 사진'
            className='w-full h-full object-cover rounded-full'
          />
        </div>
      </div>
      <div className='mt-14 mx-24'>
        <div>
          <div className='text-3xl font-semibold pl-2 mb-12'>뀡뀡이</div>
          <div className='flex items-center mb-5 text-xl'>
            <IoHome className='mr-4' />
            서울시 강동구 아리수로 93길 40
          </div>
        </div>
        <div className='mt-12 '>
          <div>내가 쓴 게시물</div>

          <div>
            <LikedPost />
          </div>
        </div>
      </div>
    </div>
  );
}
