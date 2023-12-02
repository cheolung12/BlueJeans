import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TopNavbar from '../components/common/TopNavbar';
import MyPagePosts from '../components/mypage/MyPagePosts';

export default function MyPage() {
  const [myPost, setMyPost] = useState(false);
  const [userInfo, setUserInfo] = useState({
    nickname: '',
    address: '',
    likedPost: [],
    writedPost: [],
  });

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
        // 최신순으로 게시물들을 정렬
        const sortedLikedPost = likedPost.sort((a, b) => {
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);

          return dateB - dateA;
        });
        const sortedWritedPost = writedPost.sort((a, b) => {
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);

          return dateB - dateA;
        });

        setUserInfo({
          nickname,
          address,
          likedPost: sortedLikedPost,
          writedPost: sortedWritedPost,
        });
      } catch (error) {
        console.log('fetch error', error);
      }
    };

    fetchData();
  }, []);

  const toggleMyPost = () => setMyPost((prev) => !prev);

  return (
    <div className='w-full h-screen'>
      <TopNavbar />
      <div className='flex w-full h-full'>
        {/* 회원정보 */}
        <div className='w-1/3 h-full bg-slate-500'></div>
        {/* 게시물 보기 */}
        <div className='w-2/3 h-full box-border px-8 '>
          <div className='flex w-full justify-evenly'>
            <div className='w-full text-center' onClick={toggleMyPost}>내 게시물</div>
            <div className='w-full text-center' onClick={toggleMyPost}>찜한 게시물</div>
          </div>
          <div className='w-full grid grid-cols-1 sm:grid-cols-2 justify-center items-center gap-y-14 overflow-scroll box-border'>
            {!myPost ? (
              <MyPagePosts postLists={userInfo.likedPost} />
            ) : (
              <MyPagePosts postLists={userInfo.writedPost} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
