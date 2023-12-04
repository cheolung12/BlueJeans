import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ResButton from '../../components/common/ResButton';
import ContentCard from '../../components/Ebook/Detail/ContentCard';
import { IoMdHeartEmpty } from 'react-icons/io';
import { IoMdHeart } from 'react-icons/io';

export default function EBookDetail() {
  const { bookId } = useParams();

  const [booksContent, setBooksContent] = useState({
    title: '',
    id: '',
    author: '',
    thumbnail: '',
    like: 0,
    publisher: '',
    genre: '',
    description: '',
    isbn: '',
  });

  const [isHeart, setIsHeart] = useState();
  const [allHeart, setAllIsHeart] = useState();
  // const [isHovered, setIsHovered] = useState(false);

  //유효성
  const handleLogin = () => {
    if (!window.localStorage.getItem('userID')) {
      alert('로그인이 필요합니다.');
    }
  };

  // get요청
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios({
          method: 'GET',
          url: `${process.env.REACT_APP_SERVER}/ebook/detail/${bookId}`,
          withCredentials: true,
        });
        setBooksContent(response.data);
        setIsHeart(response.data.heart);
        setAllIsHeart(response.data.like);

        console.log(response);
        // console.log('찜하기 여부', response.data.heart);
      } catch (error) {
        console.log(`${process.env.REACT_APP_SERVER}/ebook/detail/${bookId}`);
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  //좋아요 버튼
  const onClickHeart = async () => {
    try {
      const response = await axios({
        method: 'POST',
        url: `${process.env.REACT_APP_SERVER}/ebook/like/${bookId}`,
        withCredentials: true,
      });
      console.log(response.data);
      setIsHeart((prev) => !prev);
      if (isHeart === true) {
        setAllIsHeart((prev) => prev - 1);
      } else if (isHeart === false) {
        setAllIsHeart((prev) => prev + 1);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className='flex lg:justify-end w-full justify-center'>
      <div className='w-[80%]'>
        <div className='flex max-[1020px]:flex-col px-38 pb-11 justify-center items-center md:flex-row'>
          {/* 이미지카드 */}
          <section
            className='flex flex-col justify-center items-center rounded-2xl w-[20rem] h-[46rem] m-2 bg-white'
            style={{
              boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
            }}
          >
            <div className='relative overflow-hidden rounded-t-lg'>
              <div className='relative'>
                {/* 배경이미지 */}
                <img
                  src={booksContent.thumbnail}
                  alt='배경'
                  className='w-96 h-[26rem] blur-lg rounded-2xl object-cover'
                />

                {/* 그라데이션 */}
                <div
                  className='absolute top-[12rem] left-0 w-full h-[10rem] z-1'
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, rgba(255, 255, 255, 0.18) 20%, rgba(255, 255, 255, 0.42) 40%, rgba(255, 255, 255, 0.68) 60%, rgba(255, 255, 255, 0.88) 80%, rgb(255, 255, 255) 100%)',
                  }}
                ></div>

                {/* 책 이미지 */}
                <img
                  src={booksContent.thumbnail}
                  alt='이미지'
                  className='w-[11rem] h-[16rem] absolute top-[45%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-1'
                  style={{
                    WebkitBoxShadow:
                      '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
                    MozBoxShadow:
                      '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
                    MsBoxShadow:
                      '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
                    OBoxShadow:
                      '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
                    boxShadow:
                      '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
                  }}
                />
              </div>
            </div>

            <div className='flex flex-col items-center justify-evenly w-[18rem] h-[29rem]'>
              <div className='text-center flex flex-col h-44 justify-between px-7'>
                <h1 className='text-xl font-semibold mb-3'>
                  {booksContent.title}
                </h1>
                <div className='text-lg font-medium mb-2'>
                  {booksContent.author}
                </div>
                <div>
                  <div className='text-sm mb-1'>
                    출판사 : {booksContent.publisher}
                  </div>
                  <div className='text-sm mb-1'>
                    분류 : {booksContent.genre}
                  </div>
                  <div className='text-sm mb-1'>ISBN : {booksContent.isbn}</div>
                </div>
              </div>

              {/* 찜하기 버튼 */}

              <div>
                {isHeart ? (
                  <div
                    className='flex flex-col items-center cursor-pointer'
                    onClick={onClickHeart}
                    // onMouseEnter={() => setIsHovered(true)}
                    // onMouseLeave={() => setIsHovered(false)}
                  >
                    <IoMdHeart className='text-4xl text-red-600' />
                    {allHeart}개
                    {/* {isHovered && (
                      <span className='text-gray-700'>좋아요 해제</span>
                    )} */}
                  </div>
                ) : (
                  <div
                    className='flex flex-col items-center cursor-pointer'
                    onClick={onClickHeart}
                    // onMouseEnter={() => setIsHovered(true)}
                    // onMouseLeave={() => setIsHovered(false)}
                  >
                    <IoMdHeartEmpty className='text-4xl text-gray-700' />
                    {allHeart}개
                    {/* {isHovered && <span className='text-gray-700'>좋아요</span>} */}
                  </div>
                )}
              </div>

              {/* 바로 읽기 버튼 */}
              {window.localStorage.getItem('userID') ? (
                <Link
                  to={`/ebook/detail/viewer/${bookId}`}
                  key={booksContent.id}
                  // state={{ id, title }}
                  onClick={handleLogin}
                >
                  <ResButton text='바로 읽기' />
                </Link>
              ) : (
                <Link to='/login' onClick={handleLogin}>
                  <ResButton text='바로 읽기' />
                </Link>
              )}
            </div>
          </section>

          {/* 내용 카드 */}
          <ContentCard description={booksContent.description} />
        </div>
        <div className='flex w-10/12 pr-[130px]'>
          <Link to={`/ebook`}>
            <div className='w-[7rem] h-[3rem] text-md hover:opacity-90 inline-flex items-center justify-center px-2 py-2 text-white bg-signatureColor rounded-lg shadow-sm font-semibold cursor-pointer'>
              목록
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
