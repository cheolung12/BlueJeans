import React, { useState } from 'react';
import axios from 'axios';
import { IoMdHeartEmpty } from 'react-icons/io';
import { IoMdHeart } from 'react-icons/io';
import { useParams } from 'react-router-dom';

export default function EbookDibsButton({ like, notlike }) {
  const { bookId } = useParams();
  // 하트 색상 변경
  const [isLikeAdd, setIsLikeAdd] = useState(false);
  // 찜하기 수 카운트
  const [likeCount, setLikeCount] = useState(0);

  //찜하기 버튼
  const onClick = async () => {
    try {
      const response = await axios({
        method: 'POST',
        url: `${process.env.REACT_APP_SERVER}/ebook/like/${bookId}`,
        withCredentials: true,
      });
      console.log(response);
      setIsLikeAdd((prevIsAdd) => !prevIsAdd);
      // setLikeCount(likeCount + 1);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div
      className='flex flex-col items-center cursor-pointer'
      onClick={onClick}
    >
      {!isLikeAdd ? (
        <IoMdHeartEmpty className='text-4xl text-gray-700' />
      ) : (
        <IoMdHeart className='text-4xl text-red-600' />
      )}

      <span className='pt-1 text-sm'>
        {/* 찜했을 때 찜해제로 변경 */}
        {!isLikeAdd ? <span>{like}</span> : <span>{notlike}</span>}
      </span>
      {/* <span className='pt-1'>{likeCount}</span> */}
    </div>
  );
}
