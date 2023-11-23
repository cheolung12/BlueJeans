import React from 'react';
import { Link } from 'react-router-dom';
import ResButton from '../../common/ResButton';
import LikeButton from '../../common/LikeButton';

export default function BookCardDetail({ data }) {
  const { thumbnail, title, author, id, description } = data;
  return (
    <div>
      <div>
        <div className='flex px-38 pb-11 justify-center'>
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
              <LikeButton />
              <Link to={`/ebook/detail/viewer/${data.id}`} key={id}>
                <ResButton text='바로 읽기' />
              </Link>
            </div>
          </section>
          <section
            className='flex flex-col items-center w-[31rem] h-[41rem] rounded-[1rem] ml-2 pt-[2.3rem] overflow-y-auto'
            style={{
              boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
            }}
          >
            <div className='w-full'>
              <div className='px-7 py-1 text-xl font-bold'>줄거리</div>
            </div>
            <div>
              <div>
                <div className='px-7 py-5'>
                  <span className='h-96'>{description}</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
