import React, { useEffect, useState } from 'react';
import { PiPlusLight } from 'react-icons/pi';
import { PiMinusThin } from 'react-icons/pi';
import { FaPlus } from 'react-icons/fa6';
import { FaMinus } from 'react-icons/fa6';

export default function BookViewer({ content }) {
  //버튼 누르면 이전, 다음 페이지로 이동
  const [currentMove, setCurrentMove] = useState(0);
  //현재 페이지 알려줌
  const [count, setCount] = useState(1);
  //폰트 사이즈 확대
  const [textSize, setTextSize] = useState(16);
  const [bookContent, setBookContent] = useState([]);

  useEffect(() => {
    function splitTextIntoArray(text, chunkSize) {
      const resultArray = [];
      for (let i = 0; i < text.length; i += chunkSize) {
        resultArray.push(text.substr(i, chunkSize));
      }
      return resultArray;
    }

    const chunkSize = 100;

    const result = splitTextIntoArray(content, chunkSize);
    setBookContent(result);
    console.log('res', result);
    console.log('배열', bookContent);
  }, []);

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
    <div className='w-full flex flex-col h-full'>
      <div className='flex justify-center'>
        {/* 확대, 축소 버튼 */}
        <div className='flex justify-end my-4 w-[70rem] max-[640px]:w-[22rem] max-[800px]:w-[35rem] max-[1300px]:w-[35rem]'>
          <div className='flex'>
            <div
              className='cursor-pointer p-1 border-[1px] rounded-xl bg-signatureColor w-[40px] h-[40px] flex justify-center items-center'
              onClick={handleZoonIn}
            >
              <FaPlus className='text-xl text-white' />
              {/* <PiPlusLight className='text-2xl text-white' /> */}
            </div>
            <div
              className='cursor-pointer p-1 border-[1px] rounded-xl bg-signatureColor w-[40px] h-[40px] flex justify-center items-center'
              onClick={handleZoonOut}
            >
              <FaMinus className='text-xl text-white' />
              {/* <PiMinusThin className='text-2xl text-white' /> */}
            </div>
          </div>
        </div>
      </div>
      <div className='px-30 h-[41rem] flex flex-col'>
        <div className='flex flex-col'>
          <div className='flex justify-center'>
            {/* 이전 페이지 버튼 */}
            <button
              onClick={preHandler}
              className='pr-3 cursor-pointer w-[7rem] flex items-center justify-end max-[750px]:hidden max-[1300px]:hidden'
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

            {/* 책 본문 */}
            <div className='flex overflow-hidden h-[640px] w-[70rem]  max-[640px]:justify-center max-[640px]:w-[22rem] max-[800px]:justify-center max-[1300px]:justify-center '>
              <div className='flex overflow-y-auto overflow-hidden text-sm max-[800px]:flex-col max-[1300px]:flex-col'>
                <div
                  className='flex transition max-[800px]:flex-col max-[1300px]:flex-col'
                  // 가로축 위치를 이동시켜 현재 페이지에 맞는 페이지를 보여줌
                  style={{ transform: `translateX(-${70 * currentMove}rem)` }}
                >
                  {bookContent.map((item, index) => (
                    <div
                      key={index}
                      className='w-[35rem] h-4/5 px-14 py-7 tracking-wider leading-loose max-[640px]:w-[22rem]'
                      style={{ fontSize: `${textSize}px` }}
                    >
                      {item}
                    </div>
                  ))}
                  {/* <div
                    className='w-[35rem] h-4/5 px-14 py-7 tracking-wider leading-loose max-[640px]:w-[22rem]'
                    style={{ fontSize: `${textSize}px` }}
                  >
                    {content}
                  </div> */}
                  {/* <div
                    className=' w-[35rem] h-4/5 px-14 py-7 tracking-wider leading-loose max-[640px]:w-[22rem]'
                    style={{ fontSize: `${textSize}px` }}
                  >
                    {content}
                  </div> */}
                </div>

                {/* <div
                  className='flex transition max-[800px]:flex-col max-[1300px]:flex-col'
                  // 가로축 위치를 이동시켜 현재 페이지에 맞는 페이지를 보여줌
                  style={{ transform: `translateX(-${70 * currentMove}rem)` }}
                >
                  <div
                    className='w-[35rem] h-4/5 px-14 py-7 tracking-wider leading-loose max-[640px]:w-[22rem]'
                    style={{ fontSize: `${textSize}px` }}
                  >
                    {content}
                  </div>
                  <div
                    className='w-[35rem] h-4/5 px-14 py-7 tracking-wider leading-loose max-[640px]:w-[22rem]'
                    style={{ fontSize: `${textSize}px` }}
                  >
                    {content}
                  </div>
                </div>

                <div
                  className='flex transition max-[800px]:flex-col max-[1300px]:flex-col'
                  // 가로축 위치를 이동시켜 현재 페이지에 맞는 페이지를 보여줌
                  style={{ transform: `translateX(-${70 * currentMove}rem)` }}
                >
                  <div
                    className='w-[35rem] h-4/5 px-14 py-7 tracking-wider leading-loose max-[640px]:w-[22rem]'
                    style={{ fontSize: `${textSize}px` }}
                  >
                    {content}
                  </div>
                  <div
                    className='w-[35rem] h-4/5 px-14 py-7 tracking-wider leading-loose max-[640px]:w-[22rem]'
                    style={{ fontSize: `${textSize}px` }}
                  >
                    {content}
                  </div>
                </div>

                <div
                  className='flex transition max-[800px]:flex-col max-[1300px]:flex-col'
                  // 가로축 위치를 이동시켜 현재 페이지에 맞는 페이지를 보여줌
                  style={{ transform: `translateX(-${70 * currentMove}rem)` }}
                >
                  <div
                    className='w-[35rem] h-4/5 px-14 py-7 tracking-wider leading-loose max-[640px]:w-[22rem]'
                    style={{ fontSize: `${textSize}px` }}
                  >
                    {content}
                  </div>
                  <div
                    className='w-[35rem] h-4/5 px-14 py-7 tracking-wider leading-loose max-[640px]:w-[22rem]'
                    style={{ fontSize: `${textSize}px` }}
                  >
                    {content}
                  </div>
                </div>

                <div
                  className='flex transition max-[800px]:flex-col max-[1300px]:flex-col'
                  // 가로축 위치를 이동시켜 현재 페이지에 맞는 페이지를 보여줌
                  style={{ transform: `translateX(-${70 * currentMove}rem)` }}
                >
                  <div
                    className='w-[35rem] h-4/5 px-14 py-7 tracking-wider leading-loose max-[640px]:w-[22rem]'
                    style={{ fontSize: `${textSize}px` }}
                  >
                    {content}
                  </div>
                  <div
                    className='w-[35rem] h-4/5 px-14 py-7 tracking-wider leading-loose max-[640px]:w-[22rem]'
                    style={{ fontSize: `${textSize}px` }}
                  >
                    {content}
                  </div>
                </div> */}

                {/* for(let i=0; i<books.length; i++ ){
                <div key={i}>
                  {books[i]}
                </div>
              }

                {data.map((item) => (
              <div key={item.id}>
                <div
                  className={`flex transition`}
                  // 가로축 위치를 이동시켜 현재 페이지에 맞는 페이지를 보여줌
                  style={{ transform: `translateX(-${54 * currentMove}rem)` }}
                >
                  <div
                    className='w-[27rem] h-[34rem] px-14 py-7 text-lg tracking-wider leading-loose'
                    key={item.id}
                  >
                    {item.content}
                  </div>
                  <div
                    className=' w-[27rem] h-[34rem] px-14 py-7 text-lg tracking-wider leading-loose'
                    key={item.id}
                  >
                    {item.content}
                  </div>
                </div>
              </div>
            ))} */}
              </div>
            </div>

            {/* 다음페이지 버튼 */}
            <button
              onClick={nextHandler}
              className='pl-3 cursor-pointer w-[7rem] flex items-center max-[750px]:hidden max-[1300px]:hidden'
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
          <div className='text-center py-7 max-[750px]:hidden max-[1300px]:hidden'>
            {/* 페이지 쪽수 */}
            <span className='my-3'>{count} / 5</span>
          </div>
        </div>
      </div>
    </div>
  );
}
