import React, { useState } from 'react';

function Filter({ handleFilter }) {
  const [select, setSelect] = useState('all');

  const handleClick = (type) => {
    setSelect(type);
    handleFilter(type);
  };

  return (
    <div className='my-4'>
      <ul className='flex'>
        <li
          onClick={() => handleClick('all')}
          className={`flex justify-center items-center px-1 cursor-pointer w-[5rem]  ${
            select === 'all'
              ? 'font-semibold text-white bg-signatureColor border-2 border-signatureColor rounded-lg'
              : 'font-semibold '
          }`}
        >
          <span className='leading-9 text-md'>전체보기</span>
        </li>
        <li
          onClick={() => handleClick('likes')}
          className={`flex justify-center items-center px-1 cursor-pointer w-[5rem] ${
            select === 'likes'
              ? 'font-semibold text-white bg-signatureColor border-2 border-signatureColor rounded-lg'
              : 'font-semibold '
          }`}
        >
          <span className='leading-9 text-md'>인기순</span>
        </li>
        <li
          onClick={() => handleClick('latest')}
          className={`flex justify-center items-center px-1 cursor-pointer w-[5rem] ${
            select === 'latest'
              ? 'font-semibold text-white bg-signatureColor border-2 border-signatureColor rounded-lg'
              : 'font-semibold '
          }`}
        >
          <span className='leading-9 text-md'>최신순</span>
        </li>
      </ul>
    </div>
  );
}

export default Filter;
