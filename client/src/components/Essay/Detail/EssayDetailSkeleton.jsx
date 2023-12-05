import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function EssayDetailSkeleton() {
  return (
    <div className='w-full flex justify-center ml-0 lg:ml-[107px]'>
      <div className='block w-[93%] sm:w-[75%]'>
        <div className='flex flex-col'>
          <div className='w-full'>
            <section className='flex justify-center'>
              <Skeleton className='w-full flex flex-col' />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
