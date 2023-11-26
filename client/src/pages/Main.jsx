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
import { MdOutlineFiberNew } from 'react-icons/md';
import { FaLocationDot } from 'react-icons/fa6';
import { FaPhone } from 'react-icons/fa6';
import { BiCommentDetail } from 'react-icons/bi';

///////////////
import 'swiper/css';

/////////////////컴포넌트 import///////////////
import 'swiper/css/pagination';
import 'swiper/css/navigation';
/////////////////////////////////////////////
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import Signup from '../components/main/Signup';
import Login from '../components/main/Login';

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
  return (
    <div>
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
                <SwiperSlide key={book.id} className=' h-full w-full'>
                  {/* <Link to={`/ebook/detail/${encodeURIComponent(book.id)}`}> */}
                  <div>
                    <img
                      src={book.thumbnail}
                      alt={book.title || 'No Title'}
                      className='h-[25rem] w-full text-blue-700'
                    />
                  </div>
                  {/* </Link> */}
                </SwiperSlide>
              </React.Fragment>
            ))
          )}
        </Swiper>
      </div>
      {/* 2 */}
      <div className='h-[37.5rem] p-3 bg-[#5495B1]'>
        <div className='flex h-full'>
          <div className='flex w-[65rem] items-end pb-5 justify-evenly'>
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
                <p className=' text-base'>{item.title}</p>
                <p className='text-xl'>{item.userid}</p>
                <div className='flex justify-center'>
                  <FaRegThumbsUp className='self-center' />
                  <p>{item.like}</p>
                </div>
              </div>
            ))}
          </div>
          <div className='flex justify-between w-30'>
            <div className='self-center text-4xl text-white font-bold place-items-end'>
              이달의 문학왕
            </div>
          </div>
        </div>
      </div>

      {/* 3 */}
      <div className='flex flex-col bg-[#F28080] h-[30rem]'>
        <p className='text-3xl font-semibold  p-9  items-start text-white'>
          채용공고보다 더 부드러운 문장이 뭐가있을 까
        </p>
        <div className='flex items-center justify-evenly w-full h-full'>
          {mJob.mainJ.slice(0, 3).map((item2) => (
            <div key={item2.id}>
              <div className=' bg-[#f49e9e] rounded-2xl shadow-xl h-64 w-96 flex'>
                <MdOutlineFiberNew className='w-1/4 h-10' />
                <div className=' self-center pt-5 text-lg  w-2/3 flex-col '>
                  <div className='flex justify-between mb-4'>
                    <div className='flex'>
                      <IoMdBriefcase className='self-center m-1' />
                      {item2.job}
                    </div>
                    <div>{item2.money}</div>
                  </div>
                  <div className='mb-4 flex'>
                    <FaLocationDot className='self-center m-1' />
                    {item2.address}
                  </div>
                  <div className='mb-4 flex'>
                    <FaPhone className='self-center m-1' />
                    {item2.contact}
                  </div>
                  <div className='mb-4 flex'>
                    <BiCommentDetail className='self-center m-1' />
                    {item2.detail}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
