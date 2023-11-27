import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
////banner1
import books from '../data/bookList.json';
///banner2
import mainL from '../data/mainL.json';
import mainJ from '../data/mainJ.json';
//////아이콘들//////
import { IoMdBriefcase } from 'react-icons/io';
import { FiBookOpen } from 'react-icons/fi';
import { FaPenNib } from 'react-icons/fa6';
import { MdChat } from 'react-icons/md';
import { GoHome } from 'react-icons/go';
import { FaRegThumbsUp } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import { FaPhone } from 'react-icons/fa6';
import { BiCommentDetail } from 'react-icons/bi';

///////////////
import 'swiper/css';
import 'swiper/swiper-bundle.css';
import { useMediaQuery } from 'react-responsive';

/////////////////컴포넌트 import///////////////
import 'swiper/css/pagination';
import 'swiper/css/navigation';
/////////////////////////////////////////////
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import Signup from '../components/main/Signup';
import Login from '../components/main/Login';
import Calligraphy from '../components/main/Calligraphy';

window.addEventListener('scroll', () => {
  console.log(window.scrollX, window.scrollY);
});

export default function Main({
  id,
  thumbnail,
  title,
  userid,
  pro,
  job,
  money,
  address,
  contact,
  detail,
}) {
  const booksArray = Object.values(books);
  const literature = mainL;
  const mJob = mainJ;
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return (
    <div>
      <div>
        <div className=' h-[650px] w-full'>
          <div className='flex justify-end'>
            <Login></Login>
            <Signup></Signup>
          </div>
        </div>
        <div className='flex justify-center'>
          <div className='rounded-[30px] shadow-md items-center flex justify-around bg-white w-full md:w-3/4 mb-4 md:h-36 md:mb-24 text-sm md:text-lg'>
            <Link
              to='/recruitment'
              className='w-full md:w-1/5 mb-2 md:mb-0  transition-transform hover:ease-linear transform hover:scale-105'
            >
              <div className='flex flex-col items-center'>
                <IoMdBriefcase className='h-8 md:h-12 w-8 md:w-12 text-[#FE8080]' />
                <p className='font-bold mt-1'>일자리</p>
              </div>
            </Link>

            <Link
              to='/ebook'
              className='w-full md:w-1/5 mb-2 md:mb-0  transition-transform hover:ease-linear transform hover:scale-105'
            >
              <div className='flex flex-col items-center'>
                <FiBookOpen className='h-8 md:h-12 w-8 md:w-12 text-[#FED001]' />
                <p className='font-bold mt-1'>e-book</p>
              </div>
            </Link>

            <Link
              to='/essay'
              className='w-full md:w-1/5 mb-2 md:mb-0 transition-transform hover:ease-linear transform hover:scale-105'
            >
              <div className='flex flex-col items-center'>
                <FaPenNib className='h-8 md:h-12 w-8 md:w-12 text-[#5495B1]' />
                <p className='font-bold mt-1'>백일장</p>
              </div>
            </Link>

            <Link
              to='/chat'
              className='w-full md:w-1/5 mb-2 md:mb-0 transition-transform hover:ease-linear transform hover:scale-105'
            >
              <div className='flex flex-col items-center'>
                <MdChat className='h-8 md:h-12 w-8 md:w-12 text-[#6694D5]' />
                <p className='font-bold mt-1'>챗봇</p>
              </div>
            </Link>

            <Link
              to='/findhome'
              className='w-full md:w-1/5 mb-2 md:mb-0 transition-transform hover:ease-linear transform hover:scale-105'
            >
              <div className='flex flex-col items-center'>
                <GoHome className='h-8 md:h-12 w-8 md:w-12 text-[#8D62E9]' />
                <p className='font-bold mt-1'>집찾기</p>
              </div>
            </Link>
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
            className=' md:w-[55rem] w-96 h-[28rem]'
            slidesPerView={3}
            loop={true}
            centeredSlides={true}
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
                spaceBetween: 20,
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
            modules={[Autoplay, Pagination, Navigation]}
          >
            {booksArray.map((value) =>
              value.map((book) => (
                <React.Fragment key={book.id}>
                  <SwiperSlide key={book.id} className='h-full w-full'>
                    <div>
                      <img
                        src={book.thumbnail}
                        alt={book.title || 'No Title'}
                        className='h-[25rem] w-full text-blue-700'
                      />
                    </div>
                  </SwiperSlide>
                </React.Fragment>
              ))
            )}
          </Swiper>
        </div>
        <div className='bg-[#5495B1] h-[37rem] flex justify-around'>
          <div className='flex w-2/3 items-end pb-5  justify-evenly'>
            {literature.mainL.slice(0, 3).map((item, index) => (
              <div key={item.id} className='text-center'>
                <div
                  className={`rounded-full ${
                    index === 0 ? 'h-80 w-80' : 'h-60 w-60'
                  }`}
                >
                  <img
                    src={item.pro}
                    alt={item.userid || 'User Profile'}
                    className='rounded-full h-full w-full'
                  />
                </div>
                <p className='text-base'>{item.title}</p>
                <p className='text-xl'>{item.userid}</p>
                <div className='flex justify-center'>
                  <FaRegThumbsUp className='self-center' />
                  <p>{item.like}</p>
                </div>
              </div>
            ))}
          </div>

          {/* 2-2  900부터*/}

          <div className='h-full'>
            <Calligraphy className='w-[50rem] h-[30rem]' />
          </div>
        </div>
        {/* 3 */}
        <div className='flex flex-col w-full bg-[#F28080] md:h-[30rem]'>
          <p className='text-4xl font-semibold p-6 md:p-9 items-start text-white'>
            채용 공고
          </p>
          <div className='flex flex-col md:flex-row items-center justify-evenly w-full h-full'>
            {mJob.mainJ.slice(0, 3).map((item2) => (
              <div
                key={item2.id}
                className='mb-6 md:mb-0 w-full md:w-1/2 lg:w-1/3'
              >
                <div className='bg-white rounded-2xl p-8 md:p-8 shadow-xl md:h-[16rem] lg:h-[18rem] ml-[10px] mr-[10px]  flex-col'>
                  <div className='text-xl flex flex-col justify-between'>
                    {/*  */}

                    <span class='animate-bounce pb-3 text-red-500 font-semibold '>
                      NEW
                    </span>
                    <div className=' self-center'>
                      <div className='mb-4 flex items-center'>
                        <IoMdBriefcase className='self-center mr-2' />
                        <span>{item2.job}</span>
                      </div>
                      <div className='mb-4 flex items-center'>
                        <FaLocationDot className='self-center mr-2' />
                        <span>{item2.address}</span>
                      </div>
                      <div className='mb-4 flex items-center'>
                        <FaPhone className='self-center mr-2' />
                        <span>{item2.contact}</span>
                      </div>
                      <div className='mb-4 flex items-center'>
                        <BiCommentDetail className='self-center mr-2' />
                        <span>{item2.detail}</span>
                      </div>
                    </div>
                  </div>
                  <div className='flex justify-end'>
                    <div>{item2.money}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
