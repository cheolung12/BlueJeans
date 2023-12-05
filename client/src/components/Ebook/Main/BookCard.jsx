import React from 'react';
import { Link } from 'react-router-dom';

export default function BookCard({ id, thumbnail, title, author }) {
  return (
    <div className='transition-transform hover:ease-linear transform hover:scale-105'>
      <Link to={`/ebook/detail/${id}`} key={id}>
        <div
          key={id}
          className=' flex flex-col items-center justify-around w-[11rem] h-[21rem]'
        >
          <div>
            <img
              src={thumbnail}
              alt='book'
              className=' w-[10rem] h-[13rem]'
              style={{
                // WebkitBoxShadow:
                //   '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
                // MozBoxShadow:
                //   '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
                // MsBoxShadow:
                //   '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
                // OBoxShadow:
                //   '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
                // boxShadow:
                //   '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
                boxShadow:
                  'rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em',
              }}
            />
          </div>
          <div className='flex flex-col text-center w-[10rem] h-[6rem] text-black'>
            <div className='font-semibold text-md'>{title}</div>
            <div className='text-sm mt-2 text-neutral-500'>{author}</div>
          </div>
        </div>
      </Link>
    </div>
  );
}
