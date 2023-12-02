import React, { useState } from 'react';
import axios from 'axios';
import { IoMdHeartEmpty } from 'react-icons/io';
import { IoMdHeart } from 'react-icons/io';
import { useParams } from 'react-router-dom';

export default function EbookDibsButton({ likebtn, notlikebtn, like, heart }) {
  const { bookId } = useParams();
  // 초기 좋아요 상태(t/f)
  // const [isLikeAdd, setIsLikeAdd] = useState(heart);

  // 로컬 스토리지 저장
  const [isLikeAdd, setIsLikeAdd] = useState(() => {
    const storedIsLikeAdd = localStorage.getItem('isLikeAdd');
    return storedIsLikeAdd ? JSON.parse(storedIsLikeAdd) : false;
  });

  // 찜하기 수 카운트
  const [likeCount, setLikeCount] = useState(like);

  //찜하기 버튼
  const onClick = async () => {
    try {
      const response = await axios({
        method: 'POST',
        url: `${process.env.REACT_APP_SERVER}/ebook/like/${bookId}`,
        withCredentials: true,
      });

      console.log(response);
      console.log('찜하기 여부22', heart);
      setIsLikeAdd((prevIsLikeAdd) => !prevIsLikeAdd);
      // setLikeCount((prevLikeCount) =>
      //   heart ? prevLikeCount + 1 : prevLikeCount - 1
      // );

      if (isLikeAdd === false) {
        setLikeCount((prevLikeCount) => prevLikeCount + 1);
      } else if (isLikeAdd === true) {
        setLikeCount((prevLikeCount) => prevLikeCount - 1);
      }

      // 로컬 스토리지에 좋아요 상태 저장
      localStorage.setItem('isLikeAdd', isLikeAdd);
      // 로컬 스토리지에 카운트 상태 저장
      // localStorage.setItem('likeCount', likeCount);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div
      className='flex flex-col items-center cursor-pointer'
      onClick={onClick}
    >
      {isLikeAdd ? (
        <IoMdHeartEmpty className='text-4xl text-gray-700' />
      ) : (
        <IoMdHeart className='text-4xl text-red-600' />
      )}

      <span className='pt-1 text-sm'>
        {/* 찜했을 때 찜해제로 변경 */}
        {isLikeAdd ? <span>{likebtn}</span> : <span>{notlikebtn}</span>}
      </span>
      <span className='pt-1'>{like}</span>
    </div>
  );
}
