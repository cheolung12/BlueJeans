import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';

//////아이콘들//////
import { IoMdBriefcase } from 'react-icons/io';
import { FaEyeSlash, FaRegThumbsUp } from 'react-icons/fa';
import { FaDAndD, FaLocationDot } from 'react-icons/fa6';
import { FaPhone } from 'react-icons/fa6';
import { BiCommentDetail } from 'react-icons/bi';
import { FaCrown } from 'react-icons/fa6';
import { PiCurrencyKrwFill } from 'react-icons/pi';

///////////////
import 'swiper/css';
import 'swiper/swiper-bundle.css';
import { useMediaQuery } from 'react-responsive';

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

import MainLast from '../components/main/MainLast.css';

//////////state/////////

window.addEventListener('scroll', () => {
  // console.log(window.scrollX, window.scrollY);
});

export default function Main() {
  <head>
    <link
      rel='stylesheet'
      href='https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css'
    />
  </head>

  const [mainData, setMainData] = useState([]);

  const [isVisible, setIsVisible] = useState(false);
  const [isVisible1, setIsVisible1] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;

      if (scrollY >= 800) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;

      if (scrollY >= 900) {
        setIsVisible1(true);
      } else {
        setIsVisible1(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;

      if (scrollY >= 1000) {
        setIsVisible2(true);
      } else {
        setIsVisible2(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  //책전체
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios({
          method: 'GET',
          url: `${process.env.REACT_APP_SERVER}/main`,
        });
        setMainData(res.data);
        // console.log('yk', res.data);
      } catch (error) {
        console.log('error', error);
      }
    };
    fetchData();
  }, []);

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
      <TopNavbar />
      <div>
        <div className=' flex items-center justify-center w-full'>
          <div
            className=' md:h-1/2 w-full flex flex-col items-center relative'
            style={{ backgroundPosition: 'bottom' }}
          >
            <img
              src={lastMain}
              alt='main'
              className='md:h-[45rem] h-[40rem] w-full object-cover bg-bottom opacity-90'
            />
            <div className='absolute md:bottom-0 bottom-10  left-0 w-full'>
              {/* 글씨가 안보이고... 어색하다 ㅜ...? ㅠㅜ*/}

              <MainBar className='flex items-end' />
            </div>
          </div>
        </div>
        {/* 1 */}
        <div className='h-[37.5rem] bg-[#F2D001] flex flex-col items-center md:flex-row md:justify-center'>
          <div className='w-full md:w-1/3 relative flex items-center justify-center mb-8 md:mb-0'>
            <div className='text-center mt-3'>
              <div className='text-4xl pb-10 font-bold'>오늘의 추천도서</div>
              <div className='md:text-lx'>
                <div className='text-2xl font-[SUIT-Regular]'>
                  1970년대의 감성부터 현대까지
                </div>
                <div className='text-2xl font-[SUIT-Regular]'>
                  지금 봐도 세련된 문장으로 감동을 주는
                </div>
                <div className=' text-2xl'>작품을 만나 보세요</div>
              </div>
            </div>
          </div>

          <Swiper
            className=' md:w-[55rem] w-80 h-[28rem]'
            slidesPerView={3}
            loop={true}
            centeredSlides={true} //중앙설정
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              '@0.3': {
                slidesPerView: 1,
                spaceBetween: 10, //여백
              },
              '@.90': {
                slidesPerView: 2,
                spaceBetween: 30,
              },
              '@1.50': {
                slidesPerView: 3,
                spaceBetween: 10,
              },
            }}
            spaceBetween={10}
            navigation={true}
            modules={[Autoplay, Navigation]}
          >
            {/* 요청해서 받은 랜덤 10개 값  */}

            {ebookList.map((book) => (
              <SwiperSlide className='h-full w-full' key={book.id}>
                <Link to={`/ebook/detail/${book.id}`}>
                  <div>
                    <img
                      src={book.thumbnail}
                      alt={book.title}
                      className='h-[25rem] w-full p-5 md:p-0'
                    />
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        {/* 2 */}
        {/* 좋아요 많은 순서대로 3개 보여주기 justify-evenly  */}
        {/* className={`fade-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`} */}
        <div className='bg-[#5495B1] w-full h-20'>
          <div className='h-full w-full text-center justify-center items-center pt-10'>
            {/* <div className='text-center mt-3'> */}
            <div className='text-4xl pb-5 font-bold text-white'>
              오늘의 문학왕
            </div>
            <div className='md:text-lx'>
              <div className='text-2xl font-[SUIT-Regular] text-white'>
                오늘의 문학왕은 누구일까요? 당신의 작품을 올리고 문학왕에
                도전하세요!
              </div>
              {/* </div> */}
            </div>
          </div>
        </div>
        <div className='bg-[#5495B1] h-[35rem] w-full flex'>
          <div className='flex h-full w-full items-center pl-4 pr-4 justify-start '>
            {isVisible && essay0 && (
              <Link to={`/essay/detail/${essayList.id}`}>
                <div
                  style={{
                    transform: isVisible ? 'translateY(0)' : 'translateY(100%)',
                    boxShadow: '22px 22px 8px -4px rgba(0,0,0,0.68)',
                    WebkitBoxShadow: '22px 22px 8px -4px rgba(0,0,0,0.68)',
                    MozBoxShadow: '22px 22px 8px -4px rgba(0,0,0,0.68)',
                    animationDuration: 'var(--animate-duration)',
                    animationDelay: 'var(--animate-delay)',
                  }}
                  className='animate__animated animate__fadeIn w-60 h-96 bg-white ml-20 shadow-2xl-black relative flex justify-center text-center pt-10 rounded-md'
                >
                  <div className='self-center'>
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
                    <div className='p-2 text-lg'>{essay0.nickname}</div>
                    <div className='p-2 text-2xl'>{essay0.title}</div>
                    <div className='flex pb-0 justify-center text-xl'>
                      <FaRegThumbsUp className=' self-center' />
                      <div>{essay0.like}</div>
                    </div>
                  </div>
                </div>
              </Link>
            )}
            {isVisible1 && essay1 && (
              <Link to={`/essay/detail/${essayList.id}`}>
                <div
                  style={{
                    boxShadow: '22px 22px 8px -4px rgba(0,0,0,0.68)',
                    WebkitBoxShadow: '22px 22px 8px -4px rgba(0,0,0,0.68)',
                    MozBoxShadow: '22px 22px 8px -4px rgba(0,0,0,0.68)',
                  }}
                  className='animate__animated animate__fadeIn w-60 h-96 bg-white ml-40 shadow-2xl-black relative flex justify-center text-center pt-10 rounded-md '
                >
                  <div className='self-center pt-10'>
                    <div className='flex justify-center'>
                      <div className='hidden lg:block sm:block sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-slate-500 shadow-xl rounded-xl  text-center'>
                        {' '}
                        <img
                          className='w-full h-full object-cover justify-center'
                          src={essay1.img_path}
                          alt=''
                        />
                      </div>
                    </div>
                    <div className='p-2 text-lg'>{essay1.nickname}</div>
                    <div className='p-2 text-2xl'>{essay1.title}</div>
                    <div className='flex pb-0 justify-center text-xl'>
                      <FaRegThumbsUp className=' self-center' />
                      <div>{essay1.like}</div>
                    </div>
                  </div>
                </div>
              </Link>
            )}
            {isVisible2 && essay2 && (
              <Link to={`/essay/detail/${essayList.id}`}>
                <div
                  style={{
                    boxShadow: '22px 22px 8px -4px rgba(0,0,0,0.68)',
                    WebkitBoxShadow: '22px 22px 8px -4px rgba(0,0,0,0.68)',
                    MozBoxShadow: '22px 22px 8px -4px rgba(0,0,0,0.68)',
                  }}
                  className='animate__animated animate__fadeIn w-60 h-96 bg-white ml-40 shadow-2xl-black relative flex justify-center text-center pt-10 rounded-md '
                >
                  <div className='self-center mt-10'>
                    <div className='flex justify-center'>
                      <div className='hidden lg:block sm:block sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-slate-500 shadow-xl rounded-xl  text-center'>
                        {' '}
                        <img
                          className='w-full h-full object-cover'
                          src={essay2.img_path}
                          alt=''
                        />
                      </div>
                    </div>
                    <div className='p-2 text-lg'>{essay2.nickname}</div>
                    <div className='p-2 text-2xl'>{essay2.title}</div>
                    <div className='flex pb-0 justify-center text-xl'>
                      <FaRegThumbsUp className=' self-center' />
                      <div>{essay2.like}</div>
                    </div>
                  </div>
                  {/* </Link> */}
                </div>
              </Link>
            )}
          </div>

          {/* 2-2  900부터*/}
          <div className='h-full  pr-4 hidden lg:block'>
            <Calligraphy className='w-[50rem] h-[30rem]' />
          </div>
        </div>
        {/* 3 */}
        {/* 젤 최신 3개 가져오기 */}
        <div className=' flex flex-col w-full bg-[#F28080] md:h-[30rem]'>
          <div className='flex justify-between'>
            <p className='text-4xl font-semibold p-6 md:p-9 items-start text-white '>
              채용 정보
            </p>
            <div className='self-end text-slate-500 hover:underline '>
              <Link to='/recruitment' className='self-end pr-8 text-lg '>
                더보기
              </Link>
            </div>
          </div>

          {/* 직업 */}
          <div className='hidden sm:block'>
            <div className='flex justify-center md:text-base lg:pl-20 lg:pr-20 '>
              {recruit0 && (
                <div
                  style={{
                    boxShadow: '-2px 5px 5px 0px rgba(79,66,66,0.54)',
                    WebkitBoxShadow: '-2px 5px 5px 0px rgba(79,66,66,0.54)',
                    MozBoxShadow: '-2px 5px 5px 0px rgba(79,66,66,0.54)',
                  }}
                  className=' bg-white rounded-2xl h-72 lg:w-1/3 w-1/2 m-4 p-5 shadow-2xl text-lg'
                >
                  <div className='animate__animated animate__bounce animate__infinite pb-2 text-red-500 font-semibold'>
                    NEW
                  </div>
                  <div className='pl-5 pt-2'>
                    <div className='mb-4 flex items-center'>
                      <IoMdBriefcase className='self-center mr-2' />
                      <span>{recruit0.title}</span>
                    </div>
                    <div className='mb-4 flex items-center'>
                      <FaLocationDot className='self-center mr-2' />
                      <span>{recruit0.region}</span>
                    </div>
                    <div className='mb-4 flex items-center'>
                      <FaPhone className='self-center mr-2' />
                      <span>{recruit0.contact}</span>
                    </div>
                    {/* <div className='mb-4 flex items-center'>
                      <BiCommentDetail className='self-center mr-2' />
                      <span>{recruit0.content}</span>
                    </div> */}
                  </div>
                  <div className='flex justify-end'>
                    <PiCurrencyKrwFill className='self-center mr-2' />
                    <span className='p-2'>
                      {recruit0.moneyStandard} {recruit0.money}
                    </span>
                    {/* <span className='p-2'>{recruit0.money}</span> */}
                  </div>
                </div>
              )}

              {recruit1 && (
                <div
                  style={{
                    boxShadow: '-2px 5px 5px 0px rgba(79,66,66,0.54)',
                    WebkitBoxShadow: '-2px 5px 5px 0px rgba(79,66,66,0.54)',
                    MozBoxShadow: '-2px 5px 5px 0px rgba(79,66,66,0.54)',
                  }}
                  className=' bg-white rounded-2xl h-72 lg:w-1/3 w-1/2 m-4 p-5 shadow-2xl text-lg'
                >
                  <div className='animate__animated animate__bounce animate__infinite pb-2 text-red-500 font-semibold sh'>
                    NEW
                  </div>
                  <div className='pl-5 pt-2'>
                    <div className='mb-4 flex items-center'>
                      <IoMdBriefcase className='self-center mr-2' />
                      <span>{recruit1.title}</span>
                    </div>
                    <div className='mb-4 flex items-center'>
                      <FaLocationDot className='self-center mr-2' />
                      <span>{recruit1.region}</span>
                    </div>
                    <div className='mb-4 flex items-center'>
                      <FaPhone className='self-center mr-2' />
                      <span>{recruit1.contact}</span>
                    </div>
                    {/* <div className='mb-4 flex items-center'>
                      <BiCommentDetail className='self-center mr-2' />
                      <span>{recruit1.content}</span>
                    </div> */}
                  </div>
                  <div className='flex justify-end'>
                    <PiCurrencyKrwFill className='self-center mr-2' />
                    <span className='p-2'>
                      {recruit0.moneyStandard} {recruit1.money}
                    </span>
                    {/* <span className='p-2'>{recruit1.money}</span> */}
                  </div>
                </div>
              )}
              {recruit2 && (
                <div
                  style={{
                    boxShadow: '-2px 5px 5px 0px rgba(79,66,66,0.54)',
                    WebkitBoxShadow: '-2px 5px 5px 0px rgba(79,66,66,0.54)',
                    MozBoxShadow: '-2px 5px 5px 0px rgba(79,66,66,0.54)',
                  }}
                  className='bg-white rounded-2xl h-72 w-1/3 m-4 p-5 hidden lg:block shadow-2xl text-lg'
                >
                  <div className='animate__animated animate__bounce animate__infinite pb-2 text-red-500 font-semibold'>
                    NEW
                  </div>
                  <div className='pl-5 pt-2'>
                    <div className='mb-4 flex items-center'>
                      <IoMdBriefcase className='self-center mr-2' />
                      <span>{recruit2.title}</span>
                    </div>
                    <div className='mb-4 flex items-center'>
                      <FaLocationDot className='self-center mr-2' />
                      <span>{recruit2.region}</span>
                    </div>
                    <div className='mb-4 flex items-center'>
                      <FaPhone className='self-center mr-2' />
                      <span>{recruit2.contact}</span>
                    </div>
                    {/* <div className='mb-4 flex items-center'>
                      <BiCommentDetail className='self-center mr-2' />
                      <span>{recruit2.content}</span>
                    </div> */}
                  </div>
                  <div className='flex justify-end'>
                    <PiCurrencyKrwFill className='self-center mr-2' />
                    <span className='p-2'>
                      {recruit2.moneyStandard} {recruit2.money}
                    </span>
                    {/* <span className='p-2'>{recruit0.money}</span> */}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 작아졌을 때 반응형 */}
          <div className='sm:hidden p-10 text-lg'>
            <Swiper
              slidesPerView={1}
              spaceBetween={30}
              loop={true}
              keyboard={{
                enabled: true,
              }}
              pagination={{
                clickable: true,
              }}
              modules={[Keyboard, Pagination, Navigation]}
              className='h-72'
            >
              {/* 각 배열과 사이즈가 작을 때 실행? */}
              {recruit0 && (
                <SwiperSlide
                  style={{
                    boxShadow: '15px 14px 197px -87px rgba(79,66,66,0.75)',
                    WebkitBoxShadow:
                      '15px 14px 197px -87px rgba(79,66,66,0.75)',
                    MozBoxShadow: '15px 14px 197px -87px rgba(79,66,66,0.75)',
                  }}
                >
                  <div className=' bg-white rounded-2xl h-72 w-1/fullm-4 p-5 shadow-lg'>
                    <div className='animate__animated animate__bounce animate__infinite pb-2 text-red-500 font-semibold sh'>
                      NEW
                    </div>
                    <div className='pl-5 pt-2'>
                      <div className='mb-4 flex items-center'>
                        <IoMdBriefcase className='self-center mr-2' />
                        <span>{recruit0.title}</span>
                      </div>
                      <div className='mb-4 flex items-center'>
                        <FaLocationDot className='self-center mr-2' />
                        <span>{recruit0.region}</span>
                      </div>
                      <div className='mb-4 flex items-center'>
                        <FaPhone className='self-center mr-2' />
                        <span>{recruit0.contact}</span>
                      </div>
                      {/* <div className='mb-4 flex items-center'>
                        <BiCommentDetail className='self-center mr-2' />
                        <span>{recruit0.content}</span>
                      </div> */}
                    </div>
                    <div className='flex justify-end'>
                      <PiCurrencyKrwFill className='self-center mr-2' />
                      <span className='p-2'>
                        {recruit0.moneyStandard} {recruit0.money}
                      </span>
                      {/* <span className='p-2'>{recruit0.money}</span> */}
                    </div>
                  </div>
                </SwiperSlide>
              )}
              {recruit1 && (
                <SwiperSlide>
                  <div className=' bg-white rounded-2xl h-72 w-1/fullm-4 p-5 shadow-lg'>
                    <div className='animate__animated animate__bounce animate__infinite pb-2 text-red-500 font-semibold sh'>
                      NEW
                    </div>
                    <div className='pl-5 pt-2'>
                      <div className='mb-4 flex items-center'>
                        <IoMdBriefcase className='self-center mr-2' />
                        <span>{recruit1.title}</span>
                      </div>
                      <div className='mb-4 flex items-center'>
                        <FaLocationDot className='self-center mr-2' />
                        <span>{recruit1.region}</span>
                      </div>
                      <div className='mb-4 flex items-center'>
                        <FaPhone className='self-center mr-2' />
                        <span>{recruit1.contact}</span>
                      </div>
                      {/* <div className='mb-4 flex items-center'>
                        <BiCommentDetail className='self-center mr-2' />
                        <span>{recruit1.content}</span>
                      </div> */}
                    </div>
                    <div className='flex justify-end'>
                      <PiCurrencyKrwFill className='self-center mr-2' />
                      <span className='p-2'>
                        {recruit1.moneyStandard} {recruit1.money}
                      </span>
                      {/* <span className='p-2'>{recruit0.money}</span> */}
                    </div>
                  </div>
                </SwiperSlide>
              )}
              {recruit2 && (
                <SwiperSlide>
                  <div className=' bg-white rounded-2xl h-72 w-1/fullm-4 p-5 shadow-lg'>
                    <div className='animate__animated animate__bounce animate__infinite pb-2 text-red-500 font-semibold sh'>
                      NEW
                    </div>
                    <div className='pl-5 pt-2'>
                      <div className='mb-4 flex items-center'>
                        <IoMdBriefcase className='self-center mr-2' />
                        <span>{recruit2.title}</span>
                      </div>
                      <div className='mb-4 flex items-center'>
                        <FaLocationDot className='self-center mr-2' />
                        <span>{recruit2.region}</span>
                      </div>
                      <div className='mb-4 flex items-center'>
                        <FaPhone className='self-center mr-2' />
                        <span>{recruit2.contact}</span>
                      </div>
                      {/* <div className='mb-4 flex items-center'>
                        <BiCommentDetail className='self-center mr-2' />
                        <span>{recruit2.content}</span>
                      </div> */}
                    </div>
                    <div className='flex justify-end'>
                      <PiCurrencyKrwFill className='self-center mr-2' />
                      <span className='p-2'>
                        {recruit2.moneyStandard} {recruit2.money}
                      </span>
                      {/* <span className='p-2'>{recruit0.money}</span> */}
                    </div>
                  </div>
                </SwiperSlide>
              )}
            </Swiper>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
