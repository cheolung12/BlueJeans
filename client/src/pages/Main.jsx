import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { IoMdHeart } from 'react-icons/io';
import 'swiper/css';
import 'swiper/swiper-bundle.css';
import lastMain from '../components/main/mainImg/lastMain.jpeg';
import { Pagination, Navigation, Autoplay, FreeMode } from 'swiper/modules';
import TopNavbar from '../components/common/TopNavbar';
import Footer from '../components/common/Footer';
import MainBar from '../components/main/MainBar';

import axios from 'axios';
import Information from '../components/main/Information';

export default function Main() {
  const [mainData, setMainData] = useState([]);
  const firstContainerRef = useRef(null);
  const secondContainerRef = useRef(null);
  const secondContainerRef2 = useRef(null);
  const thirdContainerRef = useRef(null);

  // 데이터 받아오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios({
          method: 'GET',
          url: `${process.env.REACT_APP_SERVER}/main`,
        });
        console.log(res.data);
        setMainData(res.data);
      } catch (error) {
        console.log('error', error);
      }
    };
    fetchData();
  }, []);

  // 스크롤시 이벤트 등록
  useEffect(() => {
    const handleScroll = () => {
      checkAndAddClass(firstContainerRef, 'fade-in');
      checkAndAddClass(secondContainerRef, 'fade-in');
      checkAndAddClass(secondContainerRef2, 'fade-in');
      checkAndAddClass(thirdContainerRef, 'fade-in');
    };

    const checkAndAddClass = (ref, animationName) => {
      if (ref.current) {
        const elementPosition = ref.current.offsetTop;
        const scrollPosition = window.scrollY + window.innerHeight;
        if (scrollPosition > elementPosition + 50) {
          ref.current.classList.add(animationName);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const ebookList = mainData?.ebookList || [];
  const essayList = mainData?.essayList || [];
  const essay0 = essayList[0];
  const essay1 = essayList[1];
  const essay2 = essayList[2];

  return (
    <>
      <TopNavbar isMain={true} />
      <Information />
      <div className='flex items-center justify-center w-full h-screen'>
        <div
          className='flex flex-col items-center w-full h-screen'
          style={{
            backgroundImage: `url(${lastMain})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className='absolute md:bottom-0 bottom-10  left-0 w-full'>
            <MainBar className='flex items-end' />
          </div>
        </div>
      </div>

      {/* 추천도서 */}
      {mainData.ebookList && (
        <>
          <div
            ref={firstContainerRef}
            className='w-full h-screen bg-[#F7F7F7] flex flex-col justify-center items-center'
          >
            <div className='text-6xl font-bold mb-10'>
              다양한 종류의 전자도서
            </div>
            <div className='text-xl space-y-4 flex flex-col items-center mb-16'>
              <div>1970년대의 감성부터 현대까지</div>
              <div>감동을 주는 작품들을 만나 보세요!</div>
            </div>

            <Swiper
              className='w-full h-[200px] mb-10'
              slidesPerView={8}
              spaceBetween={10}
              loop={true}
              autoplay={{ delay: 100, disableOnInteraction: false }}
              direction={'horizontal'}
              freeMode={true}
              speed={10000}
              style={{
                backgroundColor: 'transparent',
              }}
              modules={[Autoplay, Pagination, Navigation, FreeMode]}
            >
              {ebookList.slice(0, 12).map((book) => (
                <SwiperSlide key={book.id}>
                  <Link to={`/ebook/detail/${book.id}`} className='h-full'>
                    <img
                      src={book.thumbnail}
                      alt={book.title}
                      className='w-[180px] h-full object-contain'
                    />
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>

            <Swiper
              className='w-full h-[200px] mb-10'
              slidesPerView={8}
              spaceBetween={10}
              loop={true}
              autoplay={{
                delay: 100,
                disableOnInteraction: false,
                reverseDirection: true,
              }}
              direction={'horizontal'}
              freeMode={true}
              speed={10000}
              style={{
                backgroundColor: 'transparent',
              }}
              modules={[Autoplay, Pagination, Navigation, FreeMode]}
            >
              {ebookList.slice(13, 24).map((book) => (
                <SwiperSlide key={book.id}>
                  <Link to={`/ebook/detail/${book.id}`} className='h-full'>
                    <img
                      src={book.thumbnail}
                      alt={book.title}
                      className='w-[180px] h-full object-contain'
                    />
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* 에세이 */}
          <div className='w-full h-screen bg-[#FFEB60] flex flex-col justify-center items-center'>
            <div ref={secondContainerRef} className='text-6xl font-bold mb-10'>
              오늘의 문학왕
            </div>
            <div
              ref={secondContainerRef2}
              className='text-xl space-y-4 flex flex-col items-center mb-10'
            >
              <div>오늘의 문학왕은 누구일까요?</div>
              <div>당신의 작품을 올리고 문학왕에 도전하세요!</div>
            </div>

            <div className='w-full flex justify-center space-x-12 mt-16'>
              <div className='w-[250px], h-[250px] relative hover:ease-linear transform hover:scale-105'>
                <Link to={`/essay/detail/${essay0.id}`}>
                  <img
                    src='https://bluejeansbucket2.s3.ap-northeast-2.amazonaws.com/essay/KakaoTalk_Photo_2023-12-07-20-34-32+001.png'
                    alt='gold'
                    className='w-full h-full object-contain'
                    style={{
                      boxShadow: '10px 10px 5px -4px rgba(207, 207, 207, 0.75)',
                      WebkitBoxShadow:
                        '10px 10px 5px -4px rgba(207, 207, 207, 0.75)',
                      MozBoxShadow:
                        '10px 10px 5px -4px rgba(207, 207, 207, 0.75)',
                    }}
                  />
                  <div className='absolute top-0 left-0 p-6 w-full h-full'>
                    <div className='w-full h-full flex flex-col justify-center items-center space-y-2'>
                      <div className='font-bold text-lg'>
                        {essay0.nickname} 님
                      </div>
                      <img src={essay0.img_path} className='w-24 h-24' />
                      <div className='font-bold text-lg'>{essay0.title}</div>
                      <div className='flex items-center'>
                        <IoMdHeart className='text-lg text-[#FE8080] mr-2' />
                        {essay0.like}개
                      </div>
                    </div>
                  </div>
                </Link>
              </div>

              <div className='w-[250px], h-[250px] relative hover:ease-linear transform hover:scale-105'>
                <Link to={`/essay/detail/${essay1.id}`}>
                  <img
                    src='https://bluejeansbucket2.s3.ap-northeast-2.amazonaws.com/essay/KakaoTalk_Photo_2023-12-07-20-34-33+002.png'
                    alt='silver'
                    className='w-full h-full object-contain'
                    style={{
                      boxShadow: '10px 10px 5px -4px rgba(207, 207, 207, 0.75)',
                      WebkitBoxShadow:
                        '10px 10px 5px -4px rgba(207, 207, 207, 0.75)',
                      MozBoxShadow:
                        '10px 10px 5px -4px rgba(207, 207, 207, 0.75)',
                    }}
                  />
                  <div className='absolute top-0 left-0 p-6 w-full h-full'>
                    <div className='w-full h-full flex flex-col justify-center items-center space-y-2'>
                      <div className='font-bold text-lg'>
                        {essay1.nickname} 님
                      </div>
                      <img src={essay1.img_path} className='w-24 h-24' />
                      <div className='font-bold text-lg'>{essay1.title}</div>
                      <div className='flex items-center text-lg'>
                        <IoMdHeart className='text-lg text-[#FE8080] mr-2' />
                        {essay1.like}개
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
              <div className='w-[250px], h-[250px] relative hover:ease-linear transform hover:scale-105'>
                <Link to={`/essay/detail/${essay2.id}`}>
                  <img
                    src='https://bluejeansbucket2.s3.ap-northeast-2.amazonaws.com/essay/KakaoTalk_Photo_2023-12-07-20-34-33+003.png'
                    alt='bronze'
                    className='w-full h-full object-contain'
                    style={{
                      boxShadow: '10px 10px 5px -4px rgba(207, 207, 207, 0.75)',
                      WebkitBoxShadow:
                        '10px 10px 5px -4px rgba(207, 207, 207, 0.75)',
                      MozBoxShadow:
                        '10px 10px 5px -4px rgba(207, 207, 207, 0.75)',
                    }}
                  />
                  <div className='absolute top-0 left-0 p-6 w-full h-full'>
                    <div className='w-full h-full flex flex-col justify-center items-center space-y-2'>
                      <div className='font-bold text-lg'>
                        {essay2.nickname} 님
                      </div>
                      <img src={essay2.img_path} className='w-24 h-24' />
                      <div className='font-bold text-lg'>{essay2.title}</div>
                      <div className='flex items-center text-lg'>
                        <IoMdHeart className='text-lg text-[#FE8080] mr-2' />
                        {essay2.like}개
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
            <Link to='/essay'>
              <div className='mt-24 w-80 py-5 px-2 rounded-full shadow-xl bg-[#333333] text-white font-semibold flex justify-center items-center text-xl cursor-pointer'>
                모든 에세이 보러가기
              </div>
            </Link>
          </div>

          <div
            ref={thirdContainerRef}
            className='w-full h-screen bg-white lg:flex hidden justify-center items-center px-24'
          >
            <div className='flex w-full justify-between items-center'>
              <img
                src='https://bluejeansbucket2.s3.ap-northeast-2.amazonaws.com/user/%E1%84%92%E1%85%A1%E1%86%AF%E1%84%86%E1%85%A9%E1%84%82%E1%85%B5%E1%84%8B%E1%85%B5%E1%86%AF%E1%84%85%E1%85%A5.jpeg'
                className='w-1/2 h-auto'
              />
              <div className='w-1/2 h-full justify-start items-center box-border pl-24'>
                <div className='xl:text-5xl 2xl:text-6xl text-4xl font-bold mb-2'>
                  소소한 용돈벌이가
                </div>
                <div className='xl:text-5xl 2xl:text-6xl text-4xl font-bold mb-8'>
                  필요하신가요?
                </div>
                <div className='text-lg text-gray-400 mb-2'>
                  지역별로 인기공고를 확인하여
                </div>
                <div className='text-lg text-gray-400 mb-8'>
                  당신의 경력과 노련함을 공유해주세요!
                </div>
                <Link className='w-full' to='/recruitment'>
                  <div className='mt-24 w-80 py-5 px-2 rounded-full shadow-xl bg-[#1F2937] text-white font-semibold flex justify-center items-center text-xl cursor-pointer'>
                    일자리 보러가기
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <div
            ref={thirdContainerRef}
            className='w-full h-screen bg-white lg:hidden justify-center items-center px-16 sm:py-60 md:py-84 py-16'
            style={{
              backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url(${'https://bluejeansbucket2.s3.ap-northeast-2.amazonaws.com/user/%E1%84%92%E1%85%A1%E1%86%AF%E1%84%86%E1%85%A9%E1%84%82%E1%85%B5%E1%84%8B%E1%85%B5%E1%86%AF%E1%84%85%E1%85%A5.jpeg'})`,
              backgroundSize: 'cover',
              backgroundPosition: 'left',
            }}
          >
            <div className='flex w-full justify-center items-center'>
              <div className='w-10/12 justify-start items-center box-border pl-24 mt-28'>
                <div className='sm:text-2xl md:text-4xl text-xl font-bold mb-2'>
                  소소한 용돈벌이가
                </div>
                <div className='sm:text-2xl md:text-4xl text-xl font-bold mb-8'>
                  필요하신가요?
                </div>
                <div className='sm:text-xl md:text-3xl text-lg text-black mb-2'>
                  지역별로 인기공고를 확인하여
                </div>
                <div className='sm:text-xl md:text-3xl text-lg text-black mb-8'>
                  당신의 경력과 노련함을 공유해주세요!
                </div>
                <Link className='w-full' to='/recruitment'>
                  <div className='mt-24 sm:w-80 w-56 py-5 px-2 rounded-full shadow-xl bg-[#1F2937] text-white font-semibold flex justify-center items-center sm:text-xl md:text-2xl text-md cursor-pointer'>
                    일자리 보러가기
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
      <Footer />
    </>
  );
}
