import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function BookCardSkeleton() {
  return (
    <>
      <div>
        <div className='flex flex-col items-center justify-around w-[11rem] h-[21rem]'>
          <div
            className=' w-[10rem] h-[13rem]'
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
          >
            <Skeleton className=' w-[10rem] h-[13rem]' />
          </div>
          <div className='flex flex-col text-center w-[10rem] h-[6rem]'>
            <Skeleton />
            <Skeleton className='mt-2' />
          </div>
        </div>
      </div>
    </>
  );
}
