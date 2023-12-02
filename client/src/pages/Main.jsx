import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';

//////아이콘들//////
import { IoMdBriefcase } from 'react-icons/io';
import { FaRegThumbsUp } from 'react-icons/fa';
import { FaDAndD, FaLocationDot } from 'react-icons/fa6';
import { FaPhone } from 'react-icons/fa6';
import { BiCommentDetail } from 'react-icons/bi';

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

//////////state/////////

window.addEventListener('scroll', () => {
  // console.log(window.scrollX, window.scrollY);
});

export default function Main() {
  const [mainData, setMainData] = useState([]);

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
  console.log('ykyk', mainData);
  console.log('ebook', mainData.ebookList);
  console.log('essay', mainData.essayList);
  console.log('recruit', mainData.recruitList);

  const ebookList = mainData?.ebookList || [];
  const essayList = mainData?.essayList || [];
  const recruitList = mainData?.recruitList || [];

  const essay0 = essayList[0];
  const essay1 = essayList[1];
  const essay2 = essayList[2];

  const recruit0 = recruitList[0];
  const recruit1 = recruitList[1];
  const recruit2 = recruitList[2];

  const isMobile = useMediaQuery({ maxWidth: 767 });
  return (
    <>
      <TopNavbar />
      <div>
        <div className=' h-4/5 w-full relative'>
          <div
            className='h-4/5 w-full relative '
            style={{ backgroundPosition: 'bottom' }}
          >
            <img
              src={lastMain}
              alt='main'
              className='h-full w-full object-cover bg-bottom'
            />
            <div className='absolute bottom-0 left-0 w-full'>
              <MainBar className='flex items-end' />
            </div>
          </div>
        </div>

        {/* 1 */}
        <div className='h-[37.5rem] bg-[#F2D001] flex flex-col items-center md:flex-row md:justify-center'>
          <div className='w-full md:w-1/3 relative flex items-center justify-center mb-8 md:mb-0'>
            <div className='text-center mt-3'>
              <div className='text-4xl pb-10 font-bold'>오늘의 추천도서</div>
              <div className='whitespace-pre-line'>
                <div className='text-lg'>1970년대의 감성부터 현대까지</div>
                <div className='text-lg'>
                  지금 봐도 세련된 문장으로 감동을 주는
                </div>
                <div className='text-lg'>작품을 만나 보세요</div>
              </div>
            </div>
          </div>

          <Swiper
            className=' md:w-[55rem] w-80 h-[28rem]'
            slidesPerView={3}
            loop={true}
            centeredSlides={true} //중앙설정
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              '@0.25': {
                slidesPerView: 1,
                spaceBetween: 20, //여백
              },
              '@0.70': {
                slidesPerView: 2,
                spaceBetween: 40,
              },
              '@1.50': {
                slidesPerView: 3,
                spaceBetween: 50,
              },
            }}
            spaceBetween={30}
            navigation={true}
            modules={[Autoplay, Navigation]}
          >
            {/* 요청해서 받은 랜덤 10개 값  */}

            {ebookList.map((book) => (
              <Link to={`/ebook/detail/${book.id}`}>
                <SwiperSlide className='h-full w-full' key={book.id}>
                  <div>
                    <img
                      src={book.thumbnail}
                      alt={book.title}
                      className='h-[25rem] w-full text-blue-700'
                    />
                  </div>
                </SwiperSlide>
              </Link>
            ))}
          </Swiper>
        </div>
        {/* 2 */}

        {/* 좋아요 많은 순서대로 3개 보여주기  */}
        <div className='bg-[#5495B1] h-[35rem] sm:h-[37rem] flex justify-around'>
          <div className='flex w-full items-end pl-4 pr-4 justify-evenly'>
            {/* 하나 */}
            {essay1 && (
              <div className='bg-white w-28 sm:w-44 lg:w-56 h-72  lg:h-96 rounded-t-xl flex justify-center text-center self'>
                <div className=' self-center'>
                  <div className='p-2'>{essay1.user_id}</div>
                  <div className=' hidden   lg:block sm:block sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-slate-900 rounded-full'></div>
                  <div className='p-2'>{essay1.title}</div>
                  <div className='flex justify-center'>
                    <FaRegThumbsUp />
                    <div>{essay1.like}</div>
                  </div>
                </div>
              </div>
            )}

            {essay0 && (
              <div className='bg-white  w-28 sm:w-44 lg:w-56  h-96 lg:h-[30rem] rounded-t-xl flex justify-center text-center self'>
                <div className=' self-center'>
                  <div className='p-2'>{essay0.user_id}</div>
                  <div className=' hidden   lg:block sm:block sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-slate-900 rounded-full'></div>
                  <div className='p-2'>{essay0.title}</div>
                  <div className='flex justify-center self-end'>
                    <FaRegThumbsUp />
                    <div>{essay0.like}</div>
                  </div>
                </div>
              </div>
            )}
            {essay2 && (
              <div className='bg-white  w-28 sm:w-44 lg:w-56  h-64 lg:h-80 rounded-t-xl flex justify-center text-center self'>
                <div className=' self-center'>
                  <div className='p-2'>{essay2.user_id}</div>
                  <div className=' hidden   lg:block sm:block sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-slate-900 rounded-full'></div>
                  <div className='p-2'>{essay2.title}</div>
                  <div className='flex justify-center'>
                    <FaRegThumbsUp />
                    <div>{essay2.like}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* 2-2  900부터*/}
          <div className='h-full  pr-4 hidden lg:block'>
            <Calligraphy className='w-[50rem] h-[30rem]' />
          </div>
        </div>
        {/* 3 */}

        {/* 젤 최신 3개 가져오기 */}
        <div className='flex flex-col w-full bg-[#F28080] md:h-[30rem]'>
          <div className='flex justify-between'>
            <p className='text-4xl font-semibold p-6 md:p-9 items-start text-white '>
              채용 공고
            </p>
            <div className='self-end text-slate-500 hover:underline '>
              <Link to='/recruitment' className='self-end pr-8 text-lg '>
                더보기
              </Link>
            </div>
          </div>

          {/* 직업 */}
          <div className='hidden sm:block'>
            <div className='flex justify-center '>
              {recruit0 && (
                <div className=' bg-white rounded-2xl h-72 lg:w-1/3 w-1/2 m-4 p-5 shadow-lg'>
                  <span className='animate-bounce pb-2 text-red-500 font-semibold'>
                    NEW
                  </span>
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
                    <div className='mb-4 flex items-center'>
                      <BiCommentDetail className='self-center mr-2' />
                      <span>{recruit0.content}</span>
                    </div>
                  </div>
                  <div className='flex justify-end'>
                    <div className='p-2'>{recruit0.moneyStandard}</div>
                    <div className='p-2'>{recruit0.money}</div>
                  </div>
                </div>
              )}

              {recruit1 && (
                // <Link to={`/recruitment/detail/${recruit1.id}`}>
                <div className=' bg-white rounded-2xl h-72 lg:w-1/3 w-1/2 m-4 p-5 shadow-lg'>
                  <span className='animate-bounce pb-2 text-red-500 font-semibold sh'>
                    NEW
                  </span>
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
                    <div className='mb-4 flex items-center'>
                      <BiCommentDetail className='self-center mr-2' />
                      <span>{recruit1.content}</span>
                    </div>
                  </div>
                  <div className='flex justify-end'>
                    <div className='p-2'>{recruit1.moneyStandard}</div>
                    <div className='p-2'>{recruit1.money}</div>
                  </div>
                </div>
                // </Link>
              )}
              {recruit2 && (
                // <Link to={`/recruitment/detail/${recruit1.id}`}>
                <div className='bg-white rounded-2xl h-72 w-1/3 m-4 p-5 text-base hidden lg:block'>
                  <span className='animate-bounce pb-2 text-red-500 font-semibold'>
                    NEW
                  </span>
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
                    <div className='mb-4 flex items-center'>
                      <BiCommentDetail className='self-center mr-2' />
                      <span>{recruit2.content}</span>
                    </div>
                  </div>
                  <div className='flex justify-end'>
                    <div className='p-2'>{recruit2.moneyStandard}</div>
                    <div className='p-2'>{recruit2.money}</div>
                  </div>
                </div>
                // </Link>
              )}
            </div>
          </div>

          <div className='sm:hidden p-10'>
            <Swiper
              slidesPerView={1}
              spaceBetween={30}
              keyboard={{
                enabled: true,
              }}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Keyboard, Pagination, Navigation]}
              className='h-72'
            >
              {recruitList.map(
                (recruit) => (
                  console.log('dfdf', recruit),
                  (
                    <SwiperSlide
                      className='h-full w-full z-30 bg-white'
                      key={recruit.id}
                    >
                      <>
                        <div className='bg-white rounded-2xl h-72 w-1/3 m-4 p-5 text-base hidden lg:block'>
                          <span className='animate-bounce pb-2 text-red-500 font-semibold'>
                            NEW
                          </span>
                          <div className='pl-5 pt-2'>
                            <div className='mb-4 flex items-center'>
                              <IoMdBriefcase className='self-center mr-2' />
                              <span>{recruit.title}</span>
                            </div>
                            <div className='mb-4 flex items-center'>
                              <FaLocationDot className='self-center mr-2' />
                              <span>{recruit.region}</span>
                            </div>
                            <div className='mb-4 flex items-center'>
                              <FaPhone className='self-center mr-2' />
                              <span>{recruit.contact}</span>
                            </div>
                            <div className='mb-4 flex items-center'>
                              <BiCommentDetail className='self-center mr-2' />
                              <span>{recruit.content}</span>
                            </div>
                          </div>
                          <div className='flex justify-end'>
                            <div className='p-2'>{recruit.moneyStandard}</div>
                            <div className='p-2'>{recruit.money}</div>
                          </div>
                        </div>
                      </>
                    </SwiperSlide>
                  )
                )
              )}
              {/* <SwiperSlide className='bg-red-500'>Slide 1</SwiperSlide>

              <SwiperSlide className='bg-blue-500'>Slide 2</SwiperSlide>

              <SwiperSlide className='bg-orange-500'>Slide 3</SwiperSlide> */}
            </Swiper>
          </div>

          {/* <div className='flex flex-col md:flex-row text-start items-center justify-evenly w-full h-full'>
            {recruitList.map((recruit) => (
              <div
                key={recruit.id}
                className='mb-6 md:mb-0 w-full md:w-1/2 lg:w-1/3'
              >
                <Link to={`/recruitment/detail/${recruit.id}`}>
                  <div className='bg-white rounded-2xl p-8  md:p-8 shadow-xl lg:h-[18rem] md:h-[22rem] ml-[10px] mr-[10px]  flex-col'>
                    <div className='text-xl flex flex-col justify-between'>
                      {recruit && (
                        <span className='animate-bounce pb-2 text-red-500 font-semibold'>
                          NEW
                        </span>
                      )}

                      <div className='self-center md:self-start md:text-xl lg:text-lg '>
                        <div className='mb-4 flex items-center'>
                          <IoMdBriefcase className='self-center mr-2' />
                          {recruit && <span>{recruit.title}</span>}
                        </div>
                        <div className='mb-4 flex items-center'>
                          <FaLocationDot className='self-center mr-2' />
                          {recruit && <span>{recruit.region}</span>}
                        </div>
                        <div className='mb-4 flex items-center'>
                          <FaPhone className='self-center mr-2' />
                          {recruit && <span>{recruit.contact}</span>}
                        </div>
                        <div className='mb-4 flex items-center'>
                          <BiCommentDetail className='self-center mr-2' />
                          {recruit && <span>{recruit.content}</span>}
                        </div>
                      </div>
                    </div>
                    <div className='flex justify-end'>
                      {recruit && (
                        <>
                          <div className='pr-2'>{recruit.moneyStandard}</div>
                          <div>{recruit.money}</div>
                        </>
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div> */}
        </div>
      </div>

      <Footer />
    </>
  );
}
