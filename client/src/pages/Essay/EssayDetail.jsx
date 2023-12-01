import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import AddComment from '../../components/Essay/Detail/AddComment';
import CommentList from '../../components/Essay/Detail/CommentList';
import AssayDibsButton from '../../components/Essay/Detail/AssayDibsButton';
import axios from 'axios';

export default function EssayDetail() {
  const { EssayId } = useParams();
  const navigate = useNavigate();

  const [essayContent, setEssayContent] = useState({
    title: '',
    content: '',
    user_id: '',
    img_path: '',
    like: 0,
    created_at: '',
    updated_at: '',
  });

  // 댓글 담고 있는 데이터
  const [commentList, setCommentList] = useState([]);

  // get 요청
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios({
          method: 'GET',
          url: `${process.env.REACT_APP_SERVER}/essays/detail/${EssayId}`,
        });
        console.log(response.data); // 받은 데이터를 상태에 업데이트
        setEssayContent(response.data);
        setCommentList(response.data.comments); //댓글 추가
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchdata();
  }, []);

  // //새로운 댓글 업데이트
  // const handleAdd = (comment) => setCommentList([comment, ...commentList]);

  // 백일장 삭제
  const handleDelete = async () => {
    const confirm = window.confirm('게시글을 삭제하시겠습니까?');
    // console.log(isFemale)
    if (confirm) {
      try {
        const response = await axios({
          method: 'DELETE',
          url: `${process.env.REACT_APP_SERVER}/essays/detail/${EssayId}`,
          withCredentials: true,
        });
        console.log(response.data);
        alert('게시글이 삭제되었습니다.');
        navigate(`/essay`);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    } else {
      alert('게시글 삭제를 취소했습니다.');
    }
  };

  return (
    <div className='w-full flex justify-end'>
      <div className='w-[80%]'>
        <div className='flex flex-col w-[91%]'>
          <div className='w-full'>
            {essayContent.user_id === window.localStorage.getItem('userID') ? (
              <div className='flex w-full justify-end'>
                <div>
                  <Link
                    to={`/essay/edit/${EssayId}`}
                    state={{ essayData: essayContent }}
                    key={essayContent.user_id}
                  >
                    <div className='cursor-pointer w-14 h-8 mr-2 inline-flex items-center justify-center text-white bg-signatureColor rounded-lg shadow-sm font-semibold text-md'>
                      수정
                    </div>
                  </Link>

                  <div
                    onClick={handleDelete}
                    className='cursor-pointer w-14 h-8 inline-flex items-center justify-center text-white bg-signatureColor rounded-lg shadow-sm font-semibold text-md'
                  >
                    삭제
                  </div>
                </div>
              </div>
            ) : (
              <></>
            )}

            {/* 백일장 사진, 제목, 이름 */}
            <section className='flex justify-center'>
              <div className='w-full flex flex-col'>
                <div
                  className='w-full h-full mt-3 relative overflow-hidden bg-no-repeat'
                  style={{
                    backgroundImage: `url(${essayContent.img_path})`,
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
                      <div className='w-full text-3xl font-bold mb-5 text-white text-center'>
                        {essayContent.title}
                      </div>
                      <div>
                        <img
                          src={`${essayContent.user_img}`}
                          alt='프로필 사진'
                          className='w-14 h-14 rounded-full mb-2'
                        />
                      </div>
                      <div className='w-full text-lg font-semibold text-center text-white'>
                        {essayContent.nickname}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <div className='w-full h-96 mt-3 text-black'>
                <div
                  className='text-center pt-4 px-24 h-full border-2 border-gray whitespace-pre'
                  // style={{
                  //   boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                  // }}
                >
                  {essayContent.content}
                </div>
              </div>
            </section>

            {/* 좋아요 버튼 */}
            <div className='my-4'>
              <AssayDibsButton
                like='추천해요'
                notlike='추천해제'
                essayLike={essayContent.like}
              />
            </div>

            {/* 댓글 container */}
            <section className='flex justify-center h-full'>
              <div className='w-full flex flex-col'>
                <div className='w-full'>
                  {/* 댓글 입력창 */}
                  {/* <AddComment onAdd={handleAdd} /> */}
                  <AddComment />
                </div>
                <div className='mt-8 h-full'>
                  {commentList.map((item) => (
                    // 댓글 리스트
                    <CommentList
                      key={item.id}
                      comment={item}
                      // onDelete={handleDelete}
                    />
                  ))}
                </div>

                <div className='flex justify-end'>
                  <div
                    className='cursor-pointer w-14 h-8 mr-2 inline-flex items-center justify-center text-white bg-signatureColor rounded-lg shadow-sm font-semibold text-md'
                    onClick={() => navigate('/essay')}
                  >
                    목록
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
