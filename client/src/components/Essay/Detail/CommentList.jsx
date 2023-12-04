import React from 'react';
import axios from 'axios';

export default function CommentList({ comment }) {
  //댓글 삭제
  const handleDelete = async () => {
    const confirm = window.confirm('댓글을 삭제하시겠습니까?');

    if (confirm) {
      try {
        const res = await axios({
          method: 'DELETE',
          url: `${process.env.REACT_APP_SERVER}/essays/comment/${comment.id}`,
          withCredentials: true,
        });
        alert('댓글이 삭제되었습니다.');
        console.log(res.data);
        window.location.reload();
      } catch (error) {
        console.error('삭제에러:', error);
      }
    } else {
      alert('댓글 삭제를 취소했습니다.');
    }
  };

  return (
    <div className='w-full'>
      <div className='flex items-center mb-7 mx-2 justify-between'>
        <div className='flex justify-between items-center'>
          <div className='mr-2'>
            <img
              src={`${comment.img_path}`}
              alt='프로필 사진'
              className='sm:w-14 sm:h-14 w-10 h-10 rounded-3xl'
            />
          </div>
          <div className='flex flex-col justify-between ml-2'>
            <div className='font-bold text-lg sm:text-xl'>
              {comment.nickname}
            </div>
            <div className='text-sm sm:text-lg'>{comment.comment}</div>
          </div>
        </div>

        <div>
          {comment.userID === window.localStorage.getItem('userID') ? (
            // userid 대신에 닉네임
            <button
              onClick={handleDelete}
              className='text-xs sm:lg font-semibold cursor-pointer w-12 h-8 inline-flex items-center justify-center text-white bg-signatureColor rounded-lg shadow-sm hover:opacity-90'
            >
              삭제
            </button>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
