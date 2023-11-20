import React from 'react';
import { FaHeart } from 'react-icons/fa';

export default function BookCard({ id, thumbnail, title, author }) {
  return (
    <div>
      <div
        key={id}
        className=' flex flex-col items-center justify-around bg-gray-400 w-40 h-[23rem]'
      >
        <div>
          <img src={thumbnail} alt='book' className=' w-32 h-40' />
        </div>
        <div className='flex flex-col text-center w-[8rem] h-40 bg-slate-300'>
          <div className='h-32 bg-white'>{title}</div>
          <div>{author}</div>
          <div className='flex flex-col bg-slate-50'>
            <div className='flex justify-center mt-5'>
              <FaHeart />
            </div>
            <p>10</p>
          </div>
        </div>
      </div>
    </div>
  );
}
