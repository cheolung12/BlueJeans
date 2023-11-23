import React from 'react';
import { MdMenuBook } from 'react-icons/md';

function Title() {
  return (
    <div className='flex justify-center'>
      <div className='flex items-center'>
        <div>
          <MdMenuBook className='text-4xl mr-2' />
        </div>
        <div className='text-4xl text-center font-bold my-[3rem]'>E-book</div>
      </div>
    </div>
  );
}

export default Title;
