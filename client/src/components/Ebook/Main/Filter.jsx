import React from 'react';
import axios from 'axios';

function Filter({handleFilter}) {

  return (
    <div>
      <ul className='flex'>
        <li
          onClick={() => handleFilter('all')}
          className='flex justify-center p-1 cursor-pointer'
        >
          <span>전체보기</span>
        </li>
        <li
          onClick={() => handleFilter('favorite')}
          className='flex justify-center p-1 cursor-pointer'
        >
          <span>인기순</span>
        </li>
        <li
          onClick={() => handleFilter('latest')}
          className='flex justify-center p-1 cursor-pointer'
        >
          <span>최신순</span>
        </li>
      </ul>
    </div>
  );
}

export default Filter;
