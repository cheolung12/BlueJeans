import React, { useState } from 'react';
import SideNavBar from '../../components/common/SideNavBar';
import { useParams } from 'react-router-dom';
import LikeButton from '../../components/common/LikeButton';
import AddComment from '../../components/Essay/Detail/AddComment';
import CommentList from '../../components/Essay/Detail/CommentList';

export default function EssayDetail() {
  const { EssayId } = useParams();

  //댓글 담고 있는 데이터
  const [commentList, setCommentList] = useState([]);

  //새로운 댓글 업데이트
  const handleAdd = (comment) => setCommentList([comment, ...commentList]);

  //댓글 삭제
  const handleDelete = (deleted) =>
    setCommentList(commentList.filter((c) => c.id !== deleted.id));

  return (
    <div>
      <SideNavBar />
      <div className='text-center text-3xl'>백일장</div>

      <div className='w-full'>
        {/* 백일장 상세 {EssayId} */}
        <section className='flex justify-center h-full'>
          <div className='w-[40rem] h-screen flex flex-col p-3'>
            <div className='flex flex-col h-20 justify-evenly'>
              <div className='w-full text-3xl font-bold mb-2'>제목 </div>
              <div className='w-full text-lg font-semibold'>이름</div>
            </div>
            <div className='w-full h-full mt-3'>
              <div className='w-full h-1/2'>
                <img src='ddd.jpg' alt='백일장 썸네일' />
              </div>
              <div className='w-full h-1/2 mt-3'>글~~~~~</div>
            </div>
          </div>
        </section>

        {/* 좋아요 버튼 */}
        <div className='my-4'>
          <LikeButton like='좋아요' notlike='해제' />
        </div>

        <section className='flex justify-center h-full'>
          <div className='w-[40rem] flex flex-col p-3'>
            <div className='w-full'>
              {/* 댓글 입력창 */}
              <AddComment onAdd={handleAdd} />
            </div>
            <div className='mt-3 h-80'>
              {commentList.map((item) => (
                // 댓글 리스트
                <CommentList
                  key={item.id}
                  comment={item}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
