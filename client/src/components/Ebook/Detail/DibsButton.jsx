import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { CiHeart } from 'react-icons/ci';
import { IoHeartOutline } from 'react-icons/io5';
import { IoMdHeartEmpty } from 'react-icons/io';
import { PiHeartThin } from 'react-icons/pi';
import { IoMdHeart } from 'react-icons/io';

export default function DibsButton({ like, notlike, id }) {
  // 하트 색상 변경
  const [isLikeAdd, setIsLikeAdd] = useState(false);
  // 찜하기 수 카운트
  const [likeCount, setLikeCount] = useState(0);

  //찜하기 버튼
  // const likeCountHandler = async () => {
  //   try {
  //     const response = await axios({
  //       method: 'POST',
  //       url: `http://localhost:8080/api/ebook/like/${id}`,
  //       data: {
  //         bookId: id,
  //         isLikeAdd: !isLikeAdd,
  //       },
  //       withCredentials: true,
  //     });
  //     console.log(response);
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }

  //   likeCount((prevCount) => (prevCount === 0 ? 1 : 0));
  //   setLikeCount((prevIsLiked) => !prevIsLiked);
  // };

  //찜하기 보내기
  const likeCountHandler = async () => {
    const updatedLikeAdd = !isLikeAdd;

    try {
      if (!isLikeAdd) {
        setLikeCount(likeCount + 1);

        await axios.post(
          `http://localhost:8080/api/ebook/like/${id}`,
          {
            bookId: id,
            isLikeAdd: updatedLikeAdd,
          },
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
      } else {
        setLikeCount(likeCount - 1);

        await axios.post(
          `http://localhost:8080/api/ebook/like/${id}`,
          {
            bookId: id,
            isLikeAdd: updatedLikeAdd,
          },
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
      }
    } catch (error) {
      console.error('좋아요 업데이트 실패:', error);
    }
  };

  return (
    <div
      className='flex flex-col items-center cursor-pointer'
      onClick={likeCountHandler}
    >
      {!isLikeAdd ? (
        // <svg
        //   xmlns='http://www.w3.org/2000/svg'
        //   height='1em'
        //   viewBox='0 0 512 512'
        //   className='text-3xl'
        // >
        //   <path d='M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z' />
        // </svg>

        <IoMdHeartEmpty className='text-4xl text-gray-700' />
      ) : (
        // <PiHeartThin className='text-3xl' />
        // <CiHeart className='text-4xl text-gray-800' />
        // <FontAwesomeIcon icon={faHeart} className='text-3xl text-red-600' />
        <IoMdHeart className='text-4xl text-red-600' />
      )}

      <span className='pt-1 text-sm'>
        {/* 찜했을 때 찜해제로 변경 */}
        {!isLikeAdd ? <span>{like}</span> : <span>{notlike}</span>}
      </span>
      <span className='pt-1'>{likeCount}</span>
    </div>
  );
}
