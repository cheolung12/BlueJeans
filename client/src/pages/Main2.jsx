import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';

//////아이콘들//////
import { IoMdBriefcase } from 'react-icons/io';
import { FaRegThumbsUp } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import { FaPhone } from 'react-icons/fa6';
import { FaCrown } from 'react-icons/fa6';
import { PiCurrencyKrwFill } from 'react-icons/pi';

///////////////
import 'swiper/css';
import 'swiper/swiper-bundle.css';

import lastMain from '../components/main/mainImg/lastMain.jpeg';
/////////////////컴포넌트 import///////////////
import 'swiper/css/pagination';
import 'swiper/css/navigation';
/////////////////////////////////////////////
import { Keyboard, Pagination, Navigation, Autoplay } from 'swiper/modules';
import Calligraphy from '../components/main/Calligraphy';
import TopNavbar from '../components/common/TopNavbar';
import Footer from '../components/common/Footer';
import MainBar from '../components/main/MainBar';

import axios from 'axios';

export default function Main2() {
  const [mainData, setMainData] = useState([]);
  const bookTextRef = useRef(null);
  const bookSliderRef = useRef(null);
  const essayTextRef = useRef(null);
  const essayContainerRef = useRef(null);

  // 데이터 받아오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios({
          method: 'GET',
          url: `${process.env.REACT_APP_SERVER}/main`,
        });
        setMainData(res.data);
      } catch (error) {
        console.log('error', error);
      }
    };
    fetchData();
  }, []);

  //   // 스크롤시 이벤트 등록
  //   useEffect(() => {
  //     const handleScroll = () => {
  //       checkAndAddClass(bookTextRef, 'animate__fadeInLeft');
  //       checkAndAddClass(bookSliderRef, 'animate__fadeIn');
  //       checkAndAddClass(essayTextRef, 'animate__fadeIn');
  //       checkAndAddClass(essayContainerRef, 'animate__fadeInUp');
  //     };

  //     const checkAndAddClass = (ref, animationName) => {
  //       if (ref.current) {
  //         const elementPosition = ref.current.offsetTop;
  //         const scrollPosition = window.scrollY + window.innerHeight;
  //         if (scrollPosition > elementPosition + 50) {
  //           ref.current.classList.add('animate__animated', animationName);
  //         }
  //       }
  //     };
  //     window.addEventListener('scroll', handleScroll);

  //     return () => {
  //       window.removeEventListener('scroll', handleScroll);
  //     };
  //   }, []);

  const ebookList = mainData?.ebookList || [];
  const essayList = mainData?.essayList || [];
  const recruitList = mainData?.recruitList || [];

  const essay0 = essayList[0];
  const essay1 = essayList[1];
  const essay2 = essayList[2];

  const recruit0 = recruitList[0];
  const recruit1 = recruitList[1];
  const recruit2 = recruitList[2];

  return (
    <>
      <TopNavbar isMain={true} />
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
      <div className='w-full h-screen bg-[#F7F7F7] flex flex-col justify-center items-center'>
        <div className='text-6xl font-bold mb-10'>다양한 종류의 전자도서</div>
        <div className='text-xl space-y-4 flex flex-col items-center mb-10'>
          <div>1970년대의 감성부터 현대까지</div>
          <div>감동을 주는 작품들을 만나 보세요!</div>
        </div>

        <Swiper
          className='w-full h-[280px] mb-10'
          slidesPerView={6}
          spaceBetween={20}
          autoplay
          loop
          style={{
            backgroundColor: 'transparent',
          }}
          modules={[Autoplay, Pagination, Navigation]}
        >
          {ebookList.map((book) => (
            <SwiperSlide key={book.id}>
              <Link to={`/ebook/detail/${book.id}`} className='h-full'>
                <img
                  src={book.thumbnail}
                  alt={book.title}
                  className='w-full h-full object-cover'
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
        <Swiper
          className='w-full h-[280px]'
          slidesPerView={6}
          spaceBetween={20}
          autoplay
          loop
          style={{
            backgroundColor: 'transparent',
          }}
          modules={[Autoplay, Pagination, Navigation]}
        >
          {ebookList.map((book) => (
            <SwiperSlide key={book.id}>
              <Link to={`/ebook/detail/${book.id}`} className='h-full'>
                <img
                  src={book.thumbnail}
                  alt={book.title}
                  className='w-full h-full object-cover'
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* 에세이 */}
      <div className='w-full h-screen bg-[#FFEB60] flex flex-col justify-center items-center'>
      <div className='text-6xl font-bold mb-10'>오늘의 문학왕</div>
        <div className='text-xl space-y-4 flex flex-col items-center mb-10'>
          <div>오늘의 문학왕은 누구일까요?</div>
          <div>당신의 작품을 올리고 문학왕에 도전하세요!</div>
        </div>
        
        {essay0 && (
              <Link to={`/essay/detail/${essayList.id}`}>
                <div
                  style={{
                    backgroundImage: 'url("/images/gold.png")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                  className='w-60 h-96'
                >
                  {/* <div className='self-center'>
                    <div className='h-10 w-full'>
                      <FaCrown className='h-full w-full justify-center' />
                    </div>
                    <div className='flex justify-center'>
                      <div className='hidden lg:block sm:block sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-slate-500 shadow-xl rounded-xl text-center overflow-hidden'>
                        <img
                          className='w-full h-full object-cover'
                          src={essay0.img_path}
                          alt=''
                        />
                      </div>
                    </div>
                    <div className='p-2 text-lg'>이름 : {essay0.nickname}</div>
                    <div className='p-2 text-2xl'>제목 : {essay0.title}</div>
                    <div className='flex pb-0 justify-center text-xl'>
                      <FaRegThumbsUp className=' self-center' />
                      <div className='pl-2'>{essay0.like}</div>
                    </div>
                  </div> */}
                </div>
              </Link>
            )}
      </div>
    </>
  );
}
