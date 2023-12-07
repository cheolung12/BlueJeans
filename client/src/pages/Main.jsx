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

export default function Main() {
  <head>
    <link
      rel='stylesheet'
      href='https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css'
    />
  </head>;

  const [mainData, setMainData] = useState([]);
  const bookTextRef = useRef(null);
  const bookSliderRef = useRef(null);
  const essayTextRef = useRef(null);
  const essayContainerRef = useRef(null);

  useEffect(() => {
    // 데이터 받아오기
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

  // 스크롤시 이벤트 등록
  useEffect(() => {
    const handleScroll = () => {
      checkAndAddClass(bookTextRef, 'animate__fadeInLeft');
      checkAndAddClass(bookSliderRef, 'animate__fadeIn');
      checkAndAddClass(essayTextRef, 'animate__fadeIn');
      checkAndAddClass(essayContainerRef, 'animate__fadeInUp');
    };

    const checkAndAddClass = (ref, animationName) => {
      if (ref.current) {
        const elementPosition = ref.current.offsetTop;
        const scrollPosition = window.scrollY + window.innerHeight;
        if (scrollPosition > elementPosition + 50) {
          ref.current.classList.add('animate__animated', animationName);
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
        <div className='w-full h-[37.5rem] bg-[#F2D001] flex flex-col items-center lg:flex-row lg:justify-center px-28'>
          <div ref={bookTextRef} className='w-1/3 items-center justify-center'>
            <div className='sm:text-6xl text-3xl mb-12 font-bold '>
              오늘의 추천도서
            </div>
            <div className='space-y-1 text-lg sm:text-xl '>
              <div>1970년대의 감성부터 현대까지</div>
              <div>지금 봐도 세련된 문장으로 감동을 주는</div>
              <div>작품을 만나 보세요!</div>
            </div>
          </div>
          <div className='w-2/3 h-full flex items-center justify-center'>
            <Swiper
              ref={bookSliderRef}
              className='w-full'
              slidesPerView={1}
              loop={true}
              centeredSlides={true} //중앙설정
              autoplay={{
                delay: 2500,
              }}
              breakpoints={{
                376: {
                  slidesPerView: 1,
                },
                1024: {
                  slidesPerView: 2,
                },
                1280: {
                  slidesPerView: 3,
                },
              }}
              spaceBetween={40}
              modules={[Autoplay, Pagination, Navigation]}
            >
              {/* 요청해서 받은 랜덤 10개 값  */}

              {ebookList.map((book) => (
                <SwiperSlide className='h-full' key={book.id}>
                  <Link to={`/ebook/detail/${book.id}`} className=''>
                    <img
                      src={book.thumbnail}
                      alt={book.title}
                      className='h-[25rem] w-[300px] rounded-lg'
                    />
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
        {/* 2 */}
        {/* 좋아요 많은 순서대로 3개 보여주기 justify-evenly  */}
        {/* className={`fade-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`} */}
        <div className='bg-[#5495B1] w-full h-full px-28'>
          <div
            ref={essayTextRef}
            className='h-full w-full text-center justify-center items-center pt-10'
          >
            {/* <div className='text-center mt-3'> */}
            <div className='flex flex-col'>
              <div className='sm:text-4xl text-3xl pb-5 font-bold text-white'>
                오늘의 문학왕
              </div>
              <div className=''>
                <div className='w-full text-xl sm:text-2xl text-white'>
                  오늘의 문학왕은 누구일까요?
                </div>
                <div className='w-full text-xl sm:text-2xl text-white'>
                  당신의 작품을 올리고 문학왕에 도전하세요!
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='bg-[#5495B1] h-[35rem] w-full flex justify-evenly max-[1200px]:justify-center'>
          <div
            ref={essayContainerRef}
            className='flex h-full w-[70%] max-[800px]:justify-center max-[1200px]:justify-between items-center pl-4 pr-4 justify-between'
          >
            
            {essay0 && (
              <Link to={`/essay/detail/${essayList.id}`}>
                <div
                  style={{
                    backgroundImage: 'url("/images/gold.png")',
                    backgroundSize: 'cover', // 배경 이미지를 화면에 맞게 조절
                    backgroundPosition: 'center',
                    // boxShadow: '22px 22px 8px -4px rgba(0,0,0,0.68)',
                    // WebkitBoxShadow: '22px 22px 8px -4px rgba(0,0,0,0.68)',
                    // MozBoxShadow: '22px 22px 8px -4px rgba(0,0,0,0.68)',
                  }}
                  className='w-60 h-96'
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
                    <div className='p-2 text-lg'>이름 : {essay0.nickname}</div>
                    <div className='p-2 text-2xl'>제목 : {essay0.title}</div>
                    <div className='flex pb-0 justify-center text-xl'>
                      <FaRegThumbsUp className=' self-center' />
                      <div className='pl-2'>{essay0.like}</div>
                    </div>
                  </div>
                </div>
              </Link>
            )}
            {essay1 && (
              <Link to={`/essay/detail/${essayList.id}`}>
                <div
                  style={{
                    boxShadow: '22px 22px 8px -4px rgba(0,0,0,0.68)',
                    WebkitBoxShadow: '22px 22px 8px -4px rgba(0,0,0,0.68)',
                    MozBoxShadow: '22px 22px 8px -4px rgba(0,0,0,0.68)',
                  }}
                  className='animate__animated animate__fadeIn w-60 h-96 bg-white shadow-2xl-black relative flex justify-center text-center rounded-md max-[800px]:hidden '
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
                    <div className='p-2 text-lg'>이름 : {essay1.nickname}</div>
                    <div className='p-2 text-2xl'>제목 : {essay1.title}</div>
                    <div className='flex pb-0 justify-center text-xl'>
                      <FaRegThumbsUp className=' self-center' />
                      <div className='pl-2'>{essay1.like}</div>
                    </div>
                  </div>
                </div>
              </Link>
            )}
            {essay2 && (
              <Link to={`/essay/detail/${essayList.id}`}>
                <div
                  style={{
                    boxShadow: '22px 22px 8px -4px rgba(0,0,0,0.68)',
                    WebkitBoxShadow: '22px 22px 8px -4px rgba(0,0,0,0.68)',
                    MozBoxShadow: '22px 22px 8px -4px rgba(0,0,0,0.68)',
                  }}
                  className='animate__animated animate__fadeIn w-60 h-96 bg-white shadow-2xl-black relative flex justify-center text-center rounded-md  max-[1200px]:hidden'
                >
                  <div className='self-center mt-10'>
                    <div className='flex justify-center'>
                      <div className='hidden lg:block sm:block sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-slate-500 shadow-xl rounded-xl  text-center'>
                        <img
                          className='w-full h-full object-cover'
                          src={essay2.img_path}
                          alt=''
                        />
                      </div>
                    </div>
                    <div className='p-2 text-lg'>이름 : {essay2.nickname}</div>
                    <div className='p-2 text-2xl'>제목 : {essay2.title}</div>
                    <div className='flex pb-0 justify-center text-xl'>
                      <FaRegThumbsUp className=' self-center' />
                      <div className='pl-2'>{essay2.like}</div>
                    </div>
                  </div>
                  {/* </Link> */}
                </div>
              </Link>
            )}
          </div>

          {/* 2-2  900부터*/}
          <div className='h-full pr-4 hidden xl:block'>
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
