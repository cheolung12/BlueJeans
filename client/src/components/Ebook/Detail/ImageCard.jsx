import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ResButton from '../../common/ResButton';
import LikeButton from '../../common/LikeButton';

export default function ImageCard({ id, thumbnail, title, author }) {
  return (
    <div>
      <section
        className='flex flex-col justify-center items-center rounded-2xl w-[20rem] h-[41rem]'
        style={{
          boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
        }}
      >
        <div className='relative overflow-hidden rounded-t-lg'>
          <div className='relative'>
            {/* 배경이미지 */}
            <img
              src={thumbnail}
              alt='배경'
              className='w-96 h-[26rem] blur-lg rounded-2xl object-cover'
            />

            {/* 그라데이션 */}
            <div
              className='absolute top-[14rem] left-0 w-full h-[10rem] z-1'
              style={{
                background:
                  'linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, rgba(255, 255, 255, 0.18) 20%, rgba(255, 255, 255, 0.42) 40%, rgba(255, 255, 255, 0.68) 60%, rgba(255, 255, 255, 0.88) 80%, rgb(255, 255, 255) 100%)',
              }}
            ></div>

            {/* 책 이미지 */}
            <img
              src={thumbnail}
              alt='이미지'
              className='w-[11rem] h-[16rem] absolute top-[45%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-1'
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
        </div>

        <div className='flex flex-col items-center justify-evenly w-[18rem] h-[20rem]'>
          <div className='text-center'>
            <h1 className='text-lg font-semibold'>{title}</h1>
            <div className='mt-2'>{author}</div>
          </div>
          {/* 찜하기 버튼 */}
          <LikeButton />
          {/* 바로 읽기 버튼 */}
          <Link
            to={`/ebook/detail/viewer/${id}`}
            key={id}
            state={{ id, title }}
          >
            <ResButton text='바로 읽기' />
          </Link>
        </div>
      </section>
    </div>
  );
}
