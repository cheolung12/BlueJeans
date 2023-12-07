import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import AddComment from '../../components/Essay/Detail/AddComment';
import CommentList from '../../components/Essay/Detail/CommentList';
import axios from 'axios';
import { IoMdHeartEmpty } from 'react-icons/io';
import { IoMdHeart } from 'react-icons/io';
import EssayDetailSkeleton from '../../components/Essay/Detail/EssayDetailSkeleton';
export default function EssayDetail() {
  const { EssayId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [essayContent, setEssayContent] = useState({
    title: '',
    content: '',
    user_id: '',
    nickname: '',
    img_path: '',
    like: 0,
    created_at: '',
    updated_at: '',
  });

  const [commentList, setCommentList] = useState([]);
  const [isHeart, setIsHeart] = useState();
  const [allHeart, setAllIsHeart] = useState();

  useEffect(() => {
    const isLogin = localStorage.getItem('isLogin');
    //로그인된 경우에는 좋아요 여부도 같이 반환
    if (isLogin) {
      const fetchdata = async () => {
        try {
          const response = await axios({
            method: 'GET',
            url: `${process.env.REACT_APP_SERVER}/essays/detail/islogin/${EssayId}`,
            withCredentials: true,
          });
          console.log(response.data); // 받은 데이터를 상태에 업데이트
          setEssayContent(response.data);
          setCommentList(response.data.comments);
          setIsHeart(response.data.heart);
          setAllIsHeart(response.data.like);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchdata();
      //로그인이 안된경우
    } else {
      alert('로그인이 필요합니다.');
      navigate('/login');
    }
  }, [EssayId]);

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

  //좋아요 버튼
  const onClickHeart = async () => {
    try {
      // 로그인이 안된 경우, 에세이 디테일 페이지로 이동
      if (!window.localStorage.getItem('userID')) {
        alert('로그인이 필요합니다.');
      } else {
        const response = await axios({
          method: 'POST',
          url: `${process.env.REACT_APP_SERVER}/essays/detail/${EssayId}/likes`,
          withCredentials: true,
        });
        console.log(response.data);
        setIsHeart((prev) => !prev);

        if (isHeart === true) {
          setAllIsHeart((prev) => prev - 1);
        } else if (isHeart === false) {
          setAllIsHeart((prev) => prev + 1);
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return loading ? (
    <EssayDetailSkeleton />
  ) : (
    <div className='w-full flex justify-center ml-0 lg:ml-[107px]'>
      <div className='block w-[93%] sm:w-[75%]'>
        <div className='flex flex-col'>
          <div className='w-full'>
            {essayContent.user_id === window.localStorage.getItem('userID') ? (
              <div className='flex w-full justify-end'>
                <div>
                  <Link
                    to={`/essay/edit/${EssayId}`}
                    state={{ essayData: essayContent }}
                    key={essayContent.user_id}
                  >
                    <div className='cursor-pointer w-14 h-8 mr-2 inline-flex items-center justify-center text-white bg-signatureColor rounded-lg shadow-sm font-semibold text-xs sm:text-lg hover:opacity-90'>
                      수정
                    </div>
                  </Link>

                  <div
                    onClick={handleDelete}
                    className='cursor-pointer w-14 h-8 inline-flex items-center justify-center text-white bg-signatureColor rounded-lg shadow-sm font-semibold text-xs sm:text-lg hover:opacity-90'
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
                  className='w-full h-full mt-3 relative overflow-hidden bg-no-repeat rounded-t-3xl'
                  style={{
                    backgroundImage: `url(${essayContent.img_path})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '20rem',
                    zIndex: '1',
                  }}
                >
                  <div
                    className='w-full h-full flex justify-center absolute inset-0 overflow-hidden'
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
                  >
                    <div className='flex flex-col h-full justify-center items-center'>
                      <div className='w-full text-2xl sm:text-4xl font-bold mb-2 text-white text-center'>
                        {essayContent.title}
                      </div>
                      {/* <div>
                        <img
                          src={`${essayContent.user_img}`}
                          alt='프로필 사진'
                          className='w-14 h-14 rounded-full mb-2'
                        />
                      </div> */}
                      <div className='w-full text-lg sm:text-2xl font-semibold text-center text-white'>
                        {essayContent.nickname}
                      </div>
                      <div className='w-full text-md text-center text-white mt-2'>
                        {new Date(essayContent.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <div className='w-full h-[30rem] text-black mb-8'>
                <div className='text-center text-lg md:text-xl pt-5 pb-5 h-full whitespace-pre border-solid border-gray-300 border-2 overflow-auto'>
                  {essayContent.content}
                </div>
              </div>
            </section>

            <section className='w-full h-full flex justify-around sm:justify-between items-center border-solid border-gray-300 border-2 rounded-tl-3xl mb-12'>
              <div className='flex max-[640px]:flex-col max-[640px]:justify-center max-[640px]:text-center items-center ml-5 sm:ml-10 w-[7rem] sm:w-[25rem] h-40'>
                <div className='mr-0 sm:mr-7'>
                  <img
                    src={`${essayContent.user_img}`}
                    alt='프로필 사진'
                    className='w-12 h-12 sm:w-20 sm:h-20 rounded-full'
                  />
                </div>
                <div className='flex flex-col justify-center'>
                  <div className='text-lg font-bold sm:text-2xl'>
                    {essayContent.title}
                  </div>
                  <div className='text-md sm:text-lg'>
                    {essayContent.nickname}
                  </div>
                </div>
              </div>
              {/* 좋아요 버튼 */}
              <div className='flex items-center mr-5 sm:mr-10'>
                <div className='flex mr-3'>
                  {isHeart ? (
                    <div
                      className='flex flex-col items-center cursor-pointer'
                      onClick={onClickHeart}
                    >
                      <IoMdHeart className='text-5xl text-red-600' />
                      {allHeart}개
                    </div>
                  ) : (
                    <div
                      className='flex flex-col items-center cursor-pointer'
                      onClick={onClickHeart}
                    >
                      <IoMdHeartEmpty className='text-5xl text-gray-700' />
                      {allHeart}개
                    </div>
                  )}
                </div>
              </div>
            </section>

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
                  <Link to={`/essay`}>
                    <div className='sm:w-[4rem] w-[3rem] sm:h-[3rem] h-[2rem] sm:text-lg text-xs inline-flex items-center justify-center px-2 py-2 text-white bg-signatureColor rounded-lg shadow-sm font-semibold cursor-pointer hover:opacity-90'>
                      목록
                    </div>
                  </Link>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
