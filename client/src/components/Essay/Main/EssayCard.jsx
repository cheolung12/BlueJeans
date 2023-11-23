import React from 'react';
import { Link } from 'react-router-dom';

export default function EssayCard({ id, title, thumbnail }) {
  return (
    <div>
      <Link to={`/essay/detail/`} key={id}>
        <div
          className='w-[15rem] h-[20rem] m-2 flex flex-col rounded-br-2xl'
          style={{
            boxShadow: 'rgba(99, 99, 99, 0.2) 1px 3px 8px 0px',
          }}
        >
          <div className='w-full h-[9rem]'>
            <div className='flex w-full h-[9rem] justify-center items-center'>
              <div className='text-xl font-semibold'>{title}</div>
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
