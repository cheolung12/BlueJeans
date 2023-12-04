import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function EssayCardSkeleton() {
  return (
    <div>
      <div
        className='w-[17rem] h-[20rem] m-2 flex flex-col rounded-br-2xl'
        style={{
          boxShadow:
            'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px',
        }}
      >
        <div className='w-full h-[9rem]'>
          <div className='flex flex-col w-full h-[9rem] justify-evenly items-center'>
            <Skeleton width={150} />
            <Skeleton width={150} />

            <div className='flex items-center'>
              <Skeleton width={30} className='flex items-center mx-2' />
              <Skeleton width={30} className='flex items-center mx-2' />
            </div>
          </div>
        </div>

        <div className='w-full h-[11rem] rounded-br-2xl '>
          <Skeleton className='w-full h-full rounded-br-2xl' />
        </div>
      </div>
    </div>
  );
}
