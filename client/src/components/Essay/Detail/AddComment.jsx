import React, { useState } from 'react';
// import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

// export default function AddComment({ onAdd }) {
export default function AddComment() {
  const { EssayId } = useParams();
  const navigate = useNavigate();
  // console.log(EssayId);

  //댓글 입력
  const [comment, setComment] = useState('');

  const handleAdd = (e) => {
    setComment(e.target.value);
    console.log(comment);
  };

  //댓글 입력 폼 제출
  const commentSubmit = async (e) => {
    e.preventDefault();

    //빈 텍스트는 입력 x
    if (comment.trim().length === 0) {
      return;
    }

    // onAdd({
    //   id: EssayId,
    //   comment,
    //   writer: window.localStorage.getItem('userID'),
    // });
    setComment('');

    try {
      const response = await axios({
        method: 'POST',
        url: `${process.env.REACT_APP_SERVER}/essays/comment/${EssayId}`,
        data: { comment },
        withCredentials: true,
      });
      console.log(response.data);
      // navigate(`/essay/detail/${EssayId}`);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      className='flex justify-between items-center'
      onSubmit={commentSubmit}
    >
      <div className='flex justify-center items-center font-semibold text-lg w-16 h-11'>
        <div>댓글</div>
      </div>
      <input
        className='w-[82%] h-11 px-2 rounded-lg border-gray-300 outline-none pl-3 text-md focus:border-[#818CF8] border-2'
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
