import React, { useState } from 'react';
// import { v4 as uuidv4 } from 'uuid';

export default function AddComment({ onAdd }) {
  //댓글 입력
  const [comment, setComment] = useState('');

  const handleAdd = (e) => {
    setComment(e.target.value);
  };

  //댓글 입력 폼 제출
  const commentSubmit = (e) => {
    e.preventDefault();

    //빈 텍스트는 입력 x
    if (comment.trim().length === 0) {
      return;
    }

    onAdd({ id: 1, comment, writer: '유민' });
    setComment('');
  };

  return (
    <form className='flex justify-around items-center' onSubmit={commentSubmit}>
      <div className='flex justify-center items-center font-semibold text-lg w-16 h-11'>
        <div>댓글</div>
      </div>
      <input
        className='w-[75%] h-11 px-2 rounded-lg border-gray-300 outline-none pl-3 text-md focus:border-[#818CF8] border-2'
        type='text'
        placeholder='댓글을 입력해주세요'
        value={comment}
        onChange={handleAdd}
      />
      <button className='w-20 h-11 inline-flex items-center justify-center px-4 py-2 text-white bg-signatureColor rounded-lg shadow-sm font-semibold text-lg'>
        작성
      </button>
    </form>
  );
}
