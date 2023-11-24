import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

export default function LikeButton({ like, notlike, id }) {
  // 하트 색상 변경
  const [isLiked, setIsLiked] = useState(false);
  // 찜하기 수 카운트
  const [count, setCount] = useState(0);

 
  //찜하기 버튼
  //누적 카운트 x
  const onClick = async () => {
    try {
      const response = await axios({
        method: 'POST',
        url: `http://localhost:8080/api/ebook/like/${id}`,
      });
      console.log(response);
    } catch (error) {
      console.error('Error fetching data:', error);
    }

    setCount((prevCount) => (prevCount === 0 ? 1 : 0));
    setIsLiked((prevIsLiked) => !prevIsLiked);
  };


  return (
    <div
      className='flex flex-col items-center cursor-pointer'
      onClick={onClick}
    >
      {/* 빈하트로 수정해야함.... */}
      {!isLiked ? (
        <FontAwesomeIcon
          icon={faHeart}
          style={{ color: '#000000' }}
          className='text-3xl'
        />
      ) : (
        <FontAwesomeIcon
          icon={faHeart}
          style={{ color: '#b51a00' }}
          className='text-3xl'
        />
      )}

      <span className='pt-1 text-sm'>
        {/* 찜했을 때 찜해제로 변경 */}
        {!isLiked ? <span>{like}</span> : <span>{notlike}</span>}
      </span>
      <span className='pt-1'>{count}</span>
    </div>
  );
}
