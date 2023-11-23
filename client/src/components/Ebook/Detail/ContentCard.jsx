import React from 'react';

export default function ContentCard({ description }) {
  return (
    <div>
      <section
        className='flex flex-col items-center w-[31rem] h-[46rem] rounded-[1rem] ml-2 pt-[2.3rem] overflow-y-auto'
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
  );
}
