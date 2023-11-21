import React from 'react';

function Filter() {
  return (
    <div>
      <ul className='flex'>
        <li className='flex justify-center p-1'>
          <span>전체보기</span>
        </li>
        <li className='flex justify-center p-1'>
          <span>인기순</span>
        </li>
        <li className='flex justify-center p-1'>
          <span>최신순</span>
        </li>
      </ul>
    </div>
  );
}

export default Filter;
