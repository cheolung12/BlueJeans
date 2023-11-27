import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import AddComment from '../../components/Essay/Detail/AddComment';
import CommentList from '../../components/Essay/Detail/CommentList';
import AssayDibsButton from '../../components/Essay/Detail/AssayDibsButton';

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
    <div className='flex'>
      <div className='flex flex-col justify-end'>
        <div className='text-center text-3xl'>백일장</div>

        <div className='w-full'>
          {/* 백일장 상세 {EssayId} */}

          {/* 백일장 사진, 제목, 이름 */}
          <section className='flex justify-center'>
            <div className='w-[40rem] flex flex-col'>
              <div
                className='w-full h-full mt-3 relative overflow-hidden bg-no-repeat'
                style={{
                  backgroundImage:
                    'url("https://munjang.or.kr/main/img/sub/sample_img6.jpg")',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  height: '16rem',
                  zIndex: '1',
                }}
              >
                <div
                  className='w-full h-full flex justify-center absolute inset-0 overflow-hidden'
                  style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
                >
                  <div className='flex flex-col h-full justify-center items-center'>
                    <div className='w-full text-3xl font-bold mb-5 text-white'>
                      백일장제목입니다
                    </div>
                    <div>
                      <img
                        src='https://img1.daumcdn.net/thumb/R1280x0/?fname=http://t1.daumcdn.net/brunch/service/user/7r5X/image/9djEiPBPMLu_IvCYyvRPwmZkM1g.jpg'
                        alt='프로필 사진'
                        className='w-14 h-14 rounded-full mb-2'
                      />
                    </div>
                    <div className='w-full text-lg font-semibold text-center text-white'>
                      이름
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <div className='w-full h-96 mt-3 text-black'>
              <div
                className='text-center pt-4 h-full border-2 border-gray'
                // style={{
                //   boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                // }}
              >
                글~!~!~~~~~~~~~~~~~~
              </div>
            </div>
          </section>

          {/* 좋아요 버튼 */}
          <div className='my-4'>
            <AssayDibsButton like='추천해요' notlike='추천해제' />
          </div>

          {/* 댓글 container */}
          <section className='flex justify-center h-full'>
            <div className='w-[40rem] flex flex-col'>
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
    </div>
  );
}
