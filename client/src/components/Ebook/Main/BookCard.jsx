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
          <img
            src={thumbnail}
            alt='book'
            className=' w-[7rem] h-40'
            style={{
              WebkitBoxShadow:
                '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
              MozBoxShadow:
                '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
              MsBoxShadow:
                '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
              OBoxShadow:
                '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
              boxShadow:
                '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
            }}
          />
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
