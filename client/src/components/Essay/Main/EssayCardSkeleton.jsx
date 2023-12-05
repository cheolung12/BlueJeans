import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function EssayCardSkeleton() {
  return (
    <div>
      <div
        className='w-[20rem] h-[24rem] m-2 flex flex-col rounded-br-2xl bg-white'
        style={{
          boxShadow: 'rgba(99, 99, 99, 0.2) 1px 3px 8px 0px',
        }}
      >
        <div className='w-full h-[9rem]'>
          <div className='w-full h-[18rem] rounded-br-2xl '>
            <Skeleton className='w-full h-[18rem] rounded-br-2xl ' />
          </div>

          <div className='flex items-center justify-center'>
            <div className='flex flex-col w-5/6 h-[6rem] justify-center'>
              <Skeleton />
              <Skeleton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
