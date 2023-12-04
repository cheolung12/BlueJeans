import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function AddComment() {
  const { EssayId } = useParams();
  const navigate = useNavigate();

  //댓글 입력
  const [comment, setComment] = useState('');

  const handleAdd = (e) => {
    setComment(e.target.value);
    // console.log(comment);
  };

  // 로그인 여부 확인
  const isLogin = localStorage.getItem('isLogin');

  //댓글 입력 폼 제출
  const commentSubmit = async (e) => {
    e.preventDefault();
    //빈 텍스트는 입력 x
    if (comment.trim().length === 0) {
      return;
    }
    setComment('');

    if (isLogin) {
      try {
        const response = await axios({
          method: 'POST',
          url: `${process.env.REACT_APP_SERVER}/essays/comment/${EssayId}`,
          data: { comment },
          withCredentials: true,
        });
        console.log(response.data);
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
    } else
      try {
        alert('로그인이 필요합니다.');
        navigate('/login');
        const response = await axios({
          method: 'POST',
          url: `${process.env.REACT_APP_SERVER}/essays/comment/${EssayId}`,
          data: null,
        });
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
  };

  return (
    <form
      className='flex justify-between items-center'
      onSubmit={commentSubmit}
    >
      <div className='w-20 h-10 sm:h-14 inline-flex items-center justify-center px-3 py-2 text-gray-400 shadow-sm font-semibold text-xs sm:text-lg border-solid border-l-2 border-y-2 border-gray-300 rounded-l-lg'>
        <div>댓글</div>
      </div>
      <input
        className='w-full h-10 sm:h-14 px-2  border-gray-300 border-2 outline-none pl-3 text-xs sm:text-lg focus:border-[#48599A] shadow-sm '
        type='text'
        placeholder='댓글을 입력해주세요.'
        value={comment}
        onChange={handleAdd}
      />
      <button className='w-20 h-10 sm:h-14 inline-flex items-center justify-center px-3 py-2 text-white bg-signatureColor rounded-r-lg shadow-sm font-semibold text-xs sm:text-lg hover:opacity-90'>
        작성
      </button>
    </form>
  );
}
