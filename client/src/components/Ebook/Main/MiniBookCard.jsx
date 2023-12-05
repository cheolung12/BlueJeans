import React from 'react';
import { Link } from 'react-router-dom';
import 'animate.css';
export default function MiniBookCard({ id, thumbnail, title, author }) {
  return (
    <div className='animate__animated animate__fadeIn transition-transform hover:ease-linear transform hover:scale-105 '>
      <Link to={`/ebook/detail/${id}`} key={id}>
        <div key={id} className=' flex flex-col items-center w-[9rem] h-51'>
          <div className='mb-1'>
            <img
              src={thumbnail}
              alt='book'
              className=' w-[7rem] h-[9rem]'
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
          {/* <div className='flex flex-col text-center w-[9rem] text-black mt-2'>
            <div className='font-semibold text-[13px]'>{title}</div>
            <div className='text-[12px] mt-1 text-neutral-500'>{author}</div>
          </div> */}
        </div>
      </Link>
    </div>
  );
}
