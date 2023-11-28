import React from 'react';
import axios from 'axios';

export default function CommentList({ comment }) {
  console.log(comment);
  //댓글 삭제
  const handleDelete = async () => {
    // setCommentList(commentList.filter((c) => c.id !== deleted.id));
    try {
      const res = await axios({
        method: 'DELETE',
        url: `${process.env.REACT_APP_SERVER}/essays/comment/${comment.id}`,
      });
      console.log(res.data);
      window.location.reload();
    } catch (error) {
      console.error('삭제에러:', error);
    }
  };

  return (
    <div className='w-full'>
      <div className='flex items-center mb-7 mx-2 justify-between'>
        <div className='flex justify-between'>
          <div>
            <img
              src={`${comment.user.img_path}`}
              alt='프로필 사진'
              className='w-14 h-14 rounded-3xl'
            />
          </div>
          <div className='flex flex-col justify-between ml-2'>
            <div className='font-bold text-xl'>{comment.user.nickname}</div>
            <div className='text-md'>{comment.comment}</div>
          </div>
        </div>

        <div>
          {comment.user.userID === window.localStorage.getItem('userID') ? (
            // userid 대신에 닉네임
            <button onClick={handleDelete} className='font-semibold'>
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
