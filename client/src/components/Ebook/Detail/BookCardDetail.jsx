import React from 'react';

export default function BookCardDetail({
  thumbnail,
  title,
  author,
  description,
}) {
  return (
    <div>
      <div>
        <div className='flex px-38 justify-center h-full'>
          <section className='flex justify-center bg-slate-100'>
            <div className='flex flex-col items-center justify-evenly w-64 h-[33rem]'>
              <div>
                <img src={thumbnail} alt='썸네일' className='w-44' />
              </div>
              <div className='mt-7 text-center'>
                <h1>{title}</h1>
                <div className='mt-2'>{author}</div>
              </div>
            </div>
          </section>
          <section className='flex flex-col items-center bg-slate-200 ml-2 w-[40rem] h-[33rem] overflow-y-auto'>
            <div className='w-full'>
              <div className='px-7 py-5 text-xl'>줄거리</div>
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
