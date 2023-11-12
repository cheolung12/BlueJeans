import React from 'react';

export default function Navbar() {
  const menuList = [
    '일자리 구하기',
    '백일장',
    'e북',
    '이야기 친구',
    '집으로 가기',
  ];
  return (
    <div>
      <div className='flex justify-end'>
        <button className='p-5'>로그인</button>
        <button className='p-5'>회원가입</button>
      </div>

      <div className='flex justify-center items-center bg-sky-100 h-20 text-center'>
        <div>로고</div>
      </div>

      <div className='flex justify-center'>
        <ul className='flex'>
          {menuList.map(menu => (
            <li className='p-10'>{menu}</li>
          ))}
        </ul>
        <div className='absolute right-4 flex pt-10 border-b border-zinc-900'>
          🔍
          {/* <button className='mr-2'>검색</button> */}
          <input type='text' placeholder='검색' />
        </div>
      </div>
    </div>
  );
}
