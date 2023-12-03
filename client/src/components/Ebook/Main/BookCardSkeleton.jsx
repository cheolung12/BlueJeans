import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function BookCardSkeleton() {
  return (
    <>
      <div>
        <div className='flex flex-col items-center justify-around w-[11rem] h-[21rem]'>
          <div className=' w-[10rem] h-[13rem]'>
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
