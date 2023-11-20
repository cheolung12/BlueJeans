import React from 'react';

export default function InitialMsg({ name }) {
  return (
    <div>
      <div className='flex items-end m-2'>
        <div className='border rounded-full w-10 h-10'></div>
        <div className='ml-2'>{name}</div>
      </div>
      <div
        style={{ width: 'fit-content' }}
        className={
          'text-white rounded-md py-1 px-2 bg-green-800 rounded-tl-none mr-auto ml-10'
        }
      >
        안녕! 나는 {name}야! <br />
        궁금한게 있으면 뭐든지 물어봐
      </div>
    </div>
  );
}
