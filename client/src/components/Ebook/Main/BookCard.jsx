import React from 'react';
import { FaHeart } from 'react-icons/fa';

export default function BookCard({ id, thumbnail, title, author }) {
  return (
    <div>
      <div
        key={id}
        className=' flex flex-col items-center justify-around w-[11rem] h-[22rem] rounded-[0.5rem] bg-gray-200'
      >
        <div>
          <img src={thumbnail} alt='book' className=' w-[7rem] h-40' />
        </div>
        <div className='flex flex-col text-center w-[10rem] h-[8rem] justify-between text-black'>
          <div className='h-[4rem] font-semibold text-lg'>{title}</div>
          <div>{author}</div>
          {/* <div className='flex flex-col'>
            <div className='flex justify-center mt-5'>
              <FaHeart />
            </div>
            <p>10</p>
          </div> */}
        </div>
      </div>
    </div>
  );
}
