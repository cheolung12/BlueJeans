import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
////banner1
import books from '../data/bookList.json';
//////아이콘들//////
import { IoMdBriefcase } from 'react-icons/io';
import { FiBookOpen } from 'react-icons/fi';
import { FaPenNib } from 'react-icons/fa6';
import { MdChat } from 'react-icons/md';
import { GoHome } from 'react-icons/go';

///////////////
import 'swiper/css';
/////////////////컴포넌트 import///////////////
import 'swiper/css/pagination';
import 'swiper/css/navigation';
/////////////////////////////////////////////
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import Signup from '../components/main/Signup';
import Login from '../components/main/Login';

export default function Main({ id, thumbnail, title }) {
  const booksArray = Object.values(books);
  return (
    <div>
      <div>
        <div className=' h-[650px] w-full'>
          <div className='flex justify-end'>
            <Login></Login>
            <Signup></Signup>
          </div>
        </div>

        <div className=' flex justify-center'>
          <div className=' rounded-[30px] shadow-md items-center flex justify-around bg-white h-36 w-3/4 mb-24 text-lg'>
            <Link to='/recruitment' className='justify-center'>
              <p className=' font-bold h-16 w-16 text-center'>
                <IoMdBriefcase className=' h-full w-full text-[#FE8080]' />
                일자리
              </p>
            </Link>

            <Link to='/ebook' className=''>
              <p className='font-bold h-16 w-16 text-center'>
                <FiBookOpen className='text-[#FED001]  h-full w-full' />
                e-book
              </p>
            </Link>

            <Link to='/essay' className=''>
              <p className=' font-bold h-16 w-16 text-center'>
                <FaPenNib className=' text-[#5495B1] h-full w-full' />
                백일장
              </p>
            </Link>
            <Link to='/chat' className=''>
              <p className=' font-bold h-16 w-16 text-center'>
                <MdChat className=' text-[#6694D5] h-full w-full' />
                챗봇
              </p>
            </Link>
            <Link to='/findhome' className=''>
              <p className=' font-bold h-16 w-16 text-center'>
                <GoHome className='text-[#8D62E9] h-full w-full' />
                집찾기
              </p>
            </Link>
          </div>
        </div>

        {/* 1 */}
        <div className='h-[37.5rem] bg-[#F2D001] flex content-center'>
          <div className=' w-1/3 relative'>
            <div className='absolute top-1/3 pl-32'>
              <p className='text-4xl pb-10 font-bold'>오늘의 추천도서</p>
              <div className='text-lg'>
                <p>
                  1970년대의 감성부터 현대까지
                  <br />
                  지금 봐도 세련된 문장으로 감동을 주는
                  <br />
                  작품을 만나 보세요
                </p>
              </div>
            </div>
          </div>

          {/* books.thumbnail이랑 books.name 가져오기*/}

          <Swiper
            className=' w-[55rem] h-[28rem] self-center'
            // onSwiper={setSwiperRef}
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
            spaceBetween={30}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
          >
            {booksArray.map((value) =>
              value.map((book) => (
                <React.Fragment key={book.id}>
                  <SwiperSlide className=' h-full w-full'>
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

        {/* 2 */}
        <div className=' h-[37.5rem] p-3 bg-red-100'>
          <div className='flex h-full'>
            <div className='flex w-[65rem] items-end pb-5 justify-evenly'>
              <div>
                <div className=' rounded-full bg-red-500 h-80 w-80'></div>
                <p className=' text-center'>sds</p>
                <p className=' text-center'>sds</p>
              </div>
              <div>
                <div className='rounded-full  bg-orange-500 h-60 w-60'></div>
                <p className=' text-center'>sds</p>
                <p className=' text-center'>sds</p>
              </div>
              <div>
                <div className='rounded-full  bg-orange-500 h-60 w-60'></div>
                <p className=' text-center'>sds</p>
                <p className=' text-center'>sds</p>
              </div>
            </div>

            <div className='flex justify-between w-30'>
              <div className='self-center text-2xl font-bold place-items-end'>
                이달의 문학왕
              </div>
            </div>
          </div>
        </div>

        {/* 3 */}
        <div className='flex flex-col bg-[#F28080] h-[37.5rem] items-center'>
          <p className='text-4xl font-semibold mt-9 items-start pl-16  text-white'>
            추천 공고
          </p>
          <div className='flex items-center justify-evenly w-full h-full'>
            <div className='h-80 w-96 bg-slate-200 rounded-3xl shadow-lg'></div>
            <div className='h-80 w-96 bg-slate-200 rounded-3xl shadow-lg'></div>
            <div className='h-80 w-96 bg-slate-200 rounded-3xl shadow-lg'></div>
          </div>
        </div>
      </div>
    </div>
  );
}
