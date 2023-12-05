import React from 'react';
import { Link } from 'react-router-dom';
import 'animate.css';
export default function MiniBookCard({ id, thumbnail, title, author }) {
  return (
    <div className=' transition-transform hover:ease-linear transform hover:scale-105 '>
      <Link to={`/ebook/detail/${id}`} key={id}>
        <div
          key={id}
          className=' flex flex-col items-center w-[9rem] h-51 animate__animated animate__fadeIn'
        >
          <div className='mb-1'>
            <img
              src={thumbnail}
              alt='book'
              className=' w-[8rem] h-[10.3rem]'
              style={{
                boxShadow:
                  'rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em',
              }}
            />
          </div>
          {/* <div className='flex flex-col text-center w-[9rem] text-black mt-2'>
            <div className='font-semibold text-[13px]'>{title}</div>
            <div className='text-[12px] mt-1 text-neutral-500'>{author}</div>
          </div> */}
        </div>
      </Link>
    </div>
  );
}
