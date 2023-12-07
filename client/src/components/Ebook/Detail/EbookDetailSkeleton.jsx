import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function EbookDetailSkeleton() {
  return (
    <div className='relative overflow-hidden rounded-t-lg'>
      <div className='relative'>
        <div
          className='absolute top-[12rem] left-0 w-full h-[10rem] z-1'
          style={{
            background:
              'linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, rgba(255, 255, 255, 0.18) 20%, rgba(255, 255, 255, 0.42) 40%, rgba(255, 255, 255, 0.68) 60%, rgba(255, 255, 255, 0.88) 80%, rgb(255, 255, 255) 100%)',
          }}
        ></div>

        {/* 책 이미지 */}
        <Skeleton
          width='11rem'
          height='16rem'
          style={{
            position: 'absolute',
            top: '45%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: '8px',
          }}
        />
      </div>
    </div>
  );
}
