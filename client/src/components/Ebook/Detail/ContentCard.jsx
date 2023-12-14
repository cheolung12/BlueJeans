import React from 'react';

export default function ContentCard({ description }) {
  return (
    <div className='max-[768px]:w-[21rem]'>
      <section
        className='flex flex-col items-center md:w-[92%] lg:w-[80%] h-[46rem] rounded-[1rem] m-2 pt-[2.3rem] overflow-y-auto bg-white'
        style={{
          boxShadow: ' rgba(0, 0, 0, 0.15) 0px 5px 15px 0px',
        }}
      >
        <div className='w-full'>
          <div className='px-7 py-1 text-2xl font-bold'>줄거리</div>
        </div>
        <div>
          <div>
            <div className='px-7 py-5'>
              <span className='h-96 text-xl whitespace-pre-line'>
                {description}
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
