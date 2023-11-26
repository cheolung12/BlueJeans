import React, { useState } from 'react';
// import { IoIosArrowBack } from 'react-icons/io';
// import { IoIosArrowForward } from 'react-icons/io';

export default function BookViewer({ data }) {
  //버튼 누르면 이전, 다음 페이지로 이동
  const [currentMove, setCurrentMove] = useState(0);
  //현재 페이지 알려줌
  const [count, setCount] = useState(1);

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
    if (currentMove + 1 === 5) {
      alert('마지막 페이지 입니다.');
      setCurrentMove(0);
      setCount(1); // 페이지 번호 재설정
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
          className='pr-3 cursor-pointer w-[7rem] flex items-center justify-end max-[750px]:hidden max-[1200px]:hidden'
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
        <div className='flex overflow-hidden w-[54rem] max-[750px]:justify-center max-[1200px]:justify-center '>
          <div className='flex max-[750px]:flex-col max-[1204px]:flex-col '>
            <div
              className={`flex transition max-[750px]:flex-col max-[1204px]:flex-col`}
              // 가로축 위치를 이동시켜 현재 페이지에 맞는 페이지를 보여줌
              style={{ transform: `translateX(-${54 * currentMove}rem)` }}
            >
              <div className='w-[27rem] h-[34rem] max-[750px]:w-[23rem] max-[1204px]:w-[36rem] p-10 text-lg max-[750px]:text-[0.83rem] tracking-wider leading-loose max-[1204px]:h-[22rem]  max-[1200px]:text-[1.05rem]'>
                {data.content}
              </div>
              <div className=' w-[27rem] h-[34rem] max-[750px]:w-[23rem] max-[1204px]:w-[36rem] p-10 text-lg max-[750px]:text-[0.83rem] tracking-wider leading-loose max-[1204px]:h-[22rem]  max-[1200px]:text-[1.05rem]'>
                {data.content}
              </div>
            </div>

            <div
              className={`flex transition max-[750px]:flex-col max-[1204px]:flex-col`}
              style={{ transform: `translateX(-${54 * currentMove}rem)` }}
            >
              <div className='w-[27rem] h-[34rem] max-[750px]:w-[23rem] max-[1204px]:w-[36rem] p-10 text-lg max-[750px]:text-[0.83rem] tracking-wider leading-loose max-[1204px]:h-[22rem]  max-[1200px]:text-[1.05rem]'>
                {data.content}
              </div>
              <div className=' w-[27rem] h-[34rem] max-[750px]:w-[23rem] max-[1204px]:w-[36rem] p-10 text-lg max-[750px]:text-[0.83rem] tracking-wider leading-loose max-[1204px]:h-[22rem] max-[1200px]:text-[1.05rem]'>
                {data.content}
              </div>
            </div>

            <div
              className={`flex transition max-[750px]:flex-col max-[1204px]:flex-col`}
              style={{ transform: `translateX(-${54 * currentMove}rem)` }}
            >
              <div className='w-[27rem] h-[34rem] max-[750px]:w-[23rem] max-[1204px]:w-[36rem] p-10 text-lg max-[750px]:text-[0.83rem] tracking-wider leading-loose max-[1204px]:h-[22rem]  max-[1200px]:text-[1.05rem]'>
                {data.content}
              </div>
              <div className=' w-[27rem] h-[34rem] max-[750px]:w-[23rem] max-[1204px]:w-[36rem] p-10 text-lg max-[750px]:text-[0.83rem] tracking-wider leading-loose max-[1204px]:h-[22rem]  max-[1200px]:text-[1.05rem]'>
                {data.content}
              </div>
            </div>

            <div
              className={`flex transition max-[750px]:flex-col max-[1204px]:flex-col`}
              style={{ transform: `translateX(-${54 * currentMove}rem)` }}
            >
              <div className='w-[27rem] h-[34rem] max-[750px]:w-[23rem] max-[1204px]:w-[36rem] p-10 text-lg max-[750px]:text-[0.83rem] tracking-wider leading-loose max-[1204px]:h-[22rem]  max-[1200px]:text-[1.05rem]'>
                {data.content}
              </div>
              <div className=' w-[27rem] h-[34rem]  max-[750px]:w-[23rem] max-[1204px]:w-[36rem] p-10 text-lg max-[750px]:text-[0.83rem] tracking-wider leading-loose max-[1204px]:h-[22rem]  max-[1200px]:text-[1.05rem]'>
                {data.content}
              </div>
            </div>

            <div
              className={`flex transition max-[750px]:flex-col max-[1204px]:flex-col`}
              style={{ transform: `translateX(-${54 * currentMove}rem)` }}
            >
              <div className='w-[27rem] h-[34rem] max-[750px]:w-[23rem] max-[1204px]:w-[36rem] p-10 text-lg max-[750px]:text-[0.83rem] tracking-wider leading-loose max-[1204px]:h-[22rem]  max-[1200px]:text-[1.05rem]'>
                {data.content}
              </div>
              <div className=' w-[27rem] h-[34rem] max-[750px]:w-[23rem] max-[1204px]:w-[36rem] p-10 text-lg max-[750px]:text-[0.83rem] tracking-wider leading-loose max-[1204px]:h-[22rem]  max-[1200px]:text-[1.05rem]'>
                {data.content}
              </div>
            </div>

            {/* {data.map((item) => (
              <div key={item.id}>
                <div
                  className={`flex transition`}
                  // 가로축 위치를 이동시켜 현재 페이지에 맞는 페이지를 보여줌
                  style={{ transform: `translateX(-${54 * currentMove}rem)` }}
                >
                  <div
                    className='w-[27rem] h-[34rem] p-10 text-lg tracking-wider leading-loose'
                    key={item.id}
                  >
                    {item.content}
                  </div>
                  <div
                    className=' w-[27rem] h-[34rem] p-10 text-lg tracking-wider leading-loose'
                    key={item.id}
                  >
                    {item.content}
                  </div>
                </div>
              </div>
            ))} */}
          </div>
        </div>
        <button
          onClick={nextHandler}
          className='pl-3 cursor-pointer w-[7rem] flex items-center max-[750px]:hidden max-[1200px]:hidden'
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

      <div className='text-center relative top-10 max-[750px]:hidden max-[1200px]:hidden'>
        {/* 페이지 쪽수 */}
        <span>
          {count} / 5
          {/* {((currentMove + data.length) % data.length) + 1} / {data.length} */}
        </span>
      </div>
    </div>
  );
}
