import React, { useState } from 'react';
import axios from 'axios';
import { GoThumbsup } from 'react-icons/go';
import { useParams } from 'react-router-dom';

export default function AssayDibsButton({ like, notlike }) {
  const { EssayId } = useParams();
  // 하트 색상 변경
  const [isLikeAdd, setIsLikeAdd] = useState(false);
  // 찜하기 수 카운트
  const [likeCount, setLikeCount] = useState(0);

  //찜하기 버튼
  const likeCountHandler = async () => {
    try {
      const response = await axios({
        method: 'POST',
        url: `${process.env.REACT_APP_SERVER}/essays/detail/${EssayId}/likes`,
        withCredentials: true,
      });
      console.log(response);

      setIsLikeAdd(!isLikeAdd);
      setLikeCount(response.data.counts);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div
      className='flex flex-col items-center cursor-pointer'
      onClick={likeCountHandler}
    >
      {!isLikeAdd ? (
        <GoThumbsup className='text-4xl' />
      ) : (
        <GoThumbsup className='text-4xl text-yellow-300' />
      )}

      <span className='pt-1 text-sm'>
        {/* 찜했을 때 찜해제로 변경 */}
        {!isLikeAdd ? <span>{like}</span> : <span>{notlike}</span>}
      </span>
      <span className='pt-1'>{likeCount}</span>
    </div>
  );
}
