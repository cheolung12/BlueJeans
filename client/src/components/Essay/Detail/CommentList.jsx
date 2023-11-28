import React from 'react';

export default function CommentList({ comment, onDelete }) {
  const handleDelete = () => onDelete(comment);

  return (
    <div className='w-full'>
      <div className='flex items-center mb-7 mx-2 justify-between'>
        <div className='flex justify-between'>
          <div>
            <img
              src='https://img1.daumcdn.net/thumb/R1280x0/?fname=http://t1.daumcdn.net/brunch/service/user/7r5X/image/9djEiPBPMLu_IvCYyvRPwmZkM1g.jpg'
              alt='프로필 사진'
              className='w-14 h-14 rounded-3xl'
            />
          </div>
          <div className='flex flex-col justify-between ml-2'>
            <div className='font-bold text-xl'>{comment.writer}</div>
            <div className='text-md'>{comment.comment}</div>
          </div>
        </div>

        <div>
          <button onClick={handleDelete} className='font-semibold'>
            삭제
          </button>
        </div>
      </div>
    </div>
  );
}
