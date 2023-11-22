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
          <section className='flex justify-center items-center bg-[#F7f7f7] rounded-[1rem] w-[20rem] h-[41rem]'>
            <div className='flex flex-col items-center justify-evenly w-[18rem] h-[38rem]'>
              <div>
                {/* <img src={thumbnail} alt='썸네일' /> */}
                <img src={thumbnail} alt='썸네일' className='w-44' />
              </div>
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
          <section className='flex flex-col items-center w-[31rem] h-[41rem] rounded-[1rem] bg-[#F7f7f7] ml-2 pt-[2.3rem] ounded-[1rem] overflow-y-auto'>
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
