import React from 'react';
import { Link } from 'react-router-dom';

export default function Main() {
  return (
    <div>
      <div>
        <div className=' h-[700px] w-full'></div>

        <div className=' flex justify-center'>
          <div className=' rounded-[30px] shadow-md items-center flex justify-around bg-white h-24 w-3/4 mb-16 '>
            <Link to='/' className=''>
              <p>일자리</p>
            </Link>
            <Link to='/' className=''>
              <p>e-book</p>
            </Link>
            <Link to='/' className=''>
              <p>백일장</p>
            </Link>
            <Link to='/' className=''>
              <p>챗봇</p>
            </Link>
            <Link to='/' className=''>
              <p>집찾기</p>
            </Link>
          </div>
          {/* 링크로 바꾸기 링크안에 이모티콘 넣고 */}
        </div>

        <div className='h-[600px] bg-[#F2D001] flex content-center'>
          <div className=' w-1/3 relative'>
            <div className='absolute top-1/3 pl-12'>
              <p className='text-4xl pb-10 font-bold'>오늘의 추천도서</p>
              <div className=' text-lg'>
                <p className='pb-3'>1970년대의 감성부터 현대까지</p>
                <p className='pb-3'>지금 봐도 세련된 문장으로 감동을 주는</p>
                <p className='pb-3'>작품을 만나 보세요</p>
              </div>
            </div>
          </div>

          <div className='w-2/3'>셀자리</div>
        </div>

        <div className='h-[600px] bg-[#5495B1] flex '>
          <div className='w-2/3'>회원사진?</div>
          <div className='flex justify-center items-center'>
            <p className='text-4xl font-bold text-white'>이달의 문학왕</p>
          </div>
        </div>

        <div className='h-[600px] bg-[#F28080] flex'>
          <div className='w-1/3'>1</div>
          <div className='w-1/3'>2</div>
          <div className='w-1/3'>3</div>
        </div>
      </div>
    </div>
  );
}
