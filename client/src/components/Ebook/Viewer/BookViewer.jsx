import React, { useState } from 'react';
// import { IoIosArrowBack } from 'react-icons/io';
// import { IoIosArrowForward } from 'react-icons/io';

export default function BookViewer({ data }) {
  //버튼 누르면 이전, 다음 페이지로 이동
  const [currentMove, setCurrentMove] = useState(0);
  //현재 페이지 알려줌
  const [count, setCount] = useState(0);

  //이전 페이지 버튼
  const preHandler = () => {
    if (currentMove === 0) {
      alert('첫번째 페이지 입니다.');
    } else {
      setCurrentMove((prevMove) => prevMove - 1);
      setCount(count - 1);
    }
  };

  //다음 페이지 버튼
  const nextHandler = () => {
    if (currentMove === data.length - 1) {
      alert('마지막 페이지 입니다.');
      setCurrentMove(0);
      setCount(0);
    } else {
      setCurrentMove((prevMove) => prevMove + 1);
      setCount(count + 1);
    }
  };

  return (
    <div className='px-30 h-[41rem]'>
      <div className='flex justify-center'>
        <button
          onClick={preHandler}
          // disabled={currentMove === 0}
          className='pr-3 cursor-pointer w-[7rem] flex items-center justify-end'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='32'
            height='32'
            viewBox='0 0 32 32'
            fill='none'
          >
            {' '}
            <g clipPath='url(#clip0_5308_49633)'>
              {' '}
              <path
                d='M6 15.9996L22.9132 32.0017L24.0028 30.9708L8.17921 15.9996L24.0028 1.02846L22.9132 -0.00244141L6 15.9996Z'
                fill='#222222'
              />{' '}
            </g>{' '}
            <defs>
              {' '}
              <clipPath id='clip0_5308_49633'>
                {' '}
                <rect width='32' height='32' fill='white' />{' '}
              </clipPath>{' '}
            </defs>{' '}
          </svg>{' '}
        </button>
        <div className='flex overflow-hidden w-[54rem]'>
          <div className='flex'>
            {data.map((item) => (
              <div key={item.id}>
                <div
                  className={`flex transition`}
                  // 가로축 위치를 이동시켜 현재 페이지에 맞는 페이지를 보여줌
                  style={{ transform: `translateX(-${54 * currentMove}rem)` }}
                >
                  <div className='w-[27rem] h-[32rem] p-10 text-lg tracking-wider leading-loose'>
                    {item.content}
                  </div>
                  <div className=' w-[27rem] h-[32rem] p-10 text-lg tracking-wider leading-loose'>
                    {item.content}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={nextHandler}
          className='pl-3 cursor-pointer w-[7rem] flex items-center'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='32'
            height='32'
            viewBox='0 0 32 32'
            fill='none'
          >
            {' '}
            <g clipPath='url(#clip0_5308_49689)'>
              {' '}
              <path
                d='M25 15.9996L8.08678 32.0017L6.99718 30.9708L22.8208 15.9996L6.99718 1.02846L8.08678 -0.00244141L25 15.9996Z'
                fill='#222222'
              />{' '}
            </g>{' '}
            <defs>
              {' '}
              <clipPath id='clip0_5308_49689'>
                {' '}
                <rect width='32' height='32' fill='white' />{' '}
              </clipPath>{' '}
            </defs>{' '}
          </svg>{' '}
        </button>
      </div>

      <div className='text-center relative top-10'>
        {/* 페이지 쪽수 */}
        <span>
          {((currentMove + data.length) % data.length) + 1} / {data.length}
        </span>
      </div>
    </div>
  );
}
