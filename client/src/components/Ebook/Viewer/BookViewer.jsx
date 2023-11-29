import React, { useState } from 'react';
import { PiPlusLight } from 'react-icons/pi';
import { PiMinusThin } from 'react-icons/pi';
export default function BookViewer({ data }) {
  //버튼 누르면 이전, 다음 페이지로 이동
  const [currentMove, setCurrentMove] = useState(0);
  //현재 페이지 알려줌
  const [count, setCount] = useState(1);
  //폰트 사이즈 확대
  const [textSize, setTextSize] = useState(16);

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

  //글자 확대
  const handleZoonIn = () => {
    setTextSize((prevSize) => prevSize + 2);
    if (textSize === 24) setTextSize(textSize);
  };

  //글자 축소
  const handleZoonOut = () => {
    setTextSize((prevSize) => prevSize - 2);
    if (textSize === 16) setTextSize(textSize);
  };

  return (
    <div className='w-full flex flex-col'>
      <div className='flex justify-center'>
        <div className='flex justify-end w-[63rem]'>
          <div
            className='cursor-pointer p-1 mr-2 border-[1px] border-solid border-black w-[40px] h-[40px] flex justify-center items-center'
            onClick={handleZoonIn}
          >
            <PiPlusLight className='text-2xl text-black' />
          </div>
          <div
            className='cursor-pointer p-1 border-[1px] border-black w-[40px] h-[40px] flex justify-center items-center'
            onClick={handleZoonOut}
          >
            <PiMinusThin className='text-2xl text-black' />
          </div>
        </div>
      </div>
      <div className='px-30 h-[41rem] flex flex-col'>
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

          <div className='flex overflow-hidden h-[640px] w-[70rem]'>
            <div className='flex overflow-y-auto overflow-hidden text-sm'>
              <div
                className='flex transition'
                // 가로축 위치를 이동시켜 현재 페이지에 맞는 페이지를 보여줌
                style={{ transform: `translateX(-${70 * currentMove}rem)` }}
              >
                <div
                  className='w-[35rem] h-full p-14 tracking-wider leading-loose'
                  style={{ fontSize: `${textSize}px` }}
                >
                  {data.content}
                </div>
                <div
                  className=' w-[35rem] h-full p-14 tracking-wider leading-loose'
                  style={{ fontSize: `${textSize}px` }}
                >
                  {data.content}
                </div>
              </div>

              <div
                className='flex transition'
                // 가로축 위치를 이동시켜 현재 페이지에 맞는 페이지를 보여줌
                style={{ transform: `translateX(-${70 * currentMove}rem)` }}
              >
                <div
                  className='w-[35rem] h-full p-14 tracking-wider leading-loose'
                  style={{ fontSize: `${textSize}px` }}
                >
                  {data.content}
                </div>
                <div
                  className=' w-[35rem] h-full p-14 tracking-wider leading-loose'
                  style={{ fontSize: `${textSize}px` }}
                >
                  {data.content}
                </div>
              </div>

              <div
                className='flex transition'
                // 가로축 위치를 이동시켜 현재 페이지에 맞는 페이지를 보여줌
                style={{ transform: `translateX(-${70 * currentMove}rem)` }}
              >
                <div
                  className='w-[35rem] h-full p-14 tracking-wider leading-loose'
                  style={{ fontSize: `${textSize}px` }}
                >
                  {data.content}
                </div>
                <div
                  className=' w-[35rem] h-full p-14 tracking-wider leading-loose'
                  style={{ fontSize: `${textSize}px` }}
                >
                  {data.content}
                </div>
              </div>

              <div
                className='flex transition'
                // 가로축 위치를 이동시켜 현재 페이지에 맞는 페이지를 보여줌
                style={{ transform: `translateX(-${70 * currentMove}rem)` }}
              >
                <div
                  className='w-[35rem] h-full p-14 tracking-wider leading-loose'
                  style={{ fontSize: `${textSize}px` }}
                >
                  {data.content}
                </div>
                <div
                  className=' w-[35rem] h-full p-14 tracking-wider leading-loose'
                  style={{ fontSize: `${textSize}px` }}
                >
                  {data.content}
                </div>
              </div>

              <div
                className='flex transition'
                // 가로축 위치를 이동시켜 현재 페이지에 맞는 페이지를 보여줌
                style={{ transform: `translateX(-${70 * currentMove}rem)` }}
              >
                <div
                  className='w-[35rem] h-full p-14 tracking-wider leading-loose'
                  style={{ fontSize: `${textSize}px` }}
                >
                  {data.content}
                </div>
                <div
                  className=' w-[35rem] h-full p-14 tracking-wider leading-loose'
                  style={{ fontSize: `${textSize}px` }}
                >
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
                    className='w-[27rem] h-[34rem] p-14 text-lg tracking-wider leading-loose'
                    key={item.id}
                  >
                    {item.content}
                  </div>
                  <div
                    className=' w-[27rem] h-[34rem] p-14 text-lg tracking-wider leading-loose'
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

        <div className='text-center max-[750px]:hidden max-[1200px]:hidden'>
          {/* 페이지 쪽수 */}
          <span>
            {count} / 5
            {/* {((currentMove + data.length) % data.length) + 1} / {data.length} */}
          </span>
        </div>
      </div>
    </div>
  );
}
