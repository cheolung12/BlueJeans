import React from 'react';

export default function InitialMsg({ name }) {
  return (
    <div className='mb-4'>
      <div className='flex items-end m-2'>
        <div
          className='border rounded-full w-10 h-10'
          style={{
            backgroundImage: `url(/Asong.jpg)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>
        <div className='ml-2'>{name}</div>
      </div>
      <div
        style={{ width: 'fit-content' }}
        className={
          'text-white rounded-md py-2 px-2 bg-chatColor rounded-tl-none sm:mr-auto mr-4 ml-10  sm:text-xl text-md'
        }
      >
        안녕! 나는 {name}야! <br />
        궁금한게 있으면 뭐든지 물어봐
      </div>
    </div>
  );
}
