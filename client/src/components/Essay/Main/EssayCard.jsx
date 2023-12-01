import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineComment } from 'react-icons/ai';
import { AiOutlineLike } from 'react-icons/ai';

export default function EssayCard({ id, title, thumbnail, like, nickname }) {
  return (
    <div>
      <Link to={`/essay/detail/${id}`} key={id}>
        <div
          className='w-[18rem] h-[20rem] m-2 flex flex-col rounded-br-2xl'
          style={{
            boxShadow: 'rgba(99, 99, 99, 0.2) 1px 3px 8px 0px',
          }}
        >
          <div className='w-full h-[9rem]'>
            <div className='flex flex-col w-full h-[9rem] justify-evenly items-center'>
              <div className='text-xl font-semibold'>{title}</div>
              <div className='text-xl font-semibold'>{nickname}</div>

              <div className='flex text-sm'>
                <div className='flex items-center mx-2'>
                  <AiOutlineLike className='mr-1' />
                  {like}
                </div>
                <div className='flex items-center mx-2'>
                  <AiOutlineComment className='mr-1' />
                  {/* 댓글 수 데이터 받기 */}
                  <span>2</span>
                </div>
              </div>
            </div>
          </div>
          <div className='w-full h-[11rem] rounded-br-2xl '>
            <img
              src={thumbnail}
              alt='백일장썸네일'
              className='w-full h-full object-cover rounded-br-2xl'
            />
          </div>
        </div>
      </Link>
    </div>
  );
}
