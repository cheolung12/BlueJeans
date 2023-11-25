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
        <div className='h-[37.5rem] p-3 bg-[#5495B1]'>
          <div className='flex h-full'>
            <div className='flex w-[65rem] items-end pb-5 justify-evenly self-center'>
              {literature.mainL.slice(0, 3).map((item, index) => (
                <div key={item.id}>
                  <div
                    className={`rounded-full bg-color h-${
                      index === 0 ? 80 : 60
                    } w-${index === 0 ? 80 : 60}`}
                  >
                    <img
                      src={item.pro}
                      className='rounded-full h-full w-full'
                    />
                  </div>
                  <p className='text-center text-2xl'>{item.title}</p>
                  <p className='text-center text-xl'>{item.userid}</p>
                  <p className='flex justify-center'>
                    <FaRegThumbsUp className='self-center' />
                    {item.like}
                  </p>
                </div>
              ))}
            </div>

            <div className='flex justify-between w-30'>
              <div className='self-center text-4xl font-bold place-items-end'>
                이달의 문학왕
              </div>
            </div>
          </div>
        </div>

        {/* 3 */}
        <div className='flex flex-col bg-[#F28080] h-[33rem]'>
          <p className='text-4xl font-semibold  p-9   items-start  text-white'>
            추천 공고
          </p>
          <div className='flex items-center justify-evenly w-full h-full'>
            {mJob.mainJ.slice(0, 3).map((item) => (
              <div key={item.id} className='flex'>
                <div className='h-64 w-96 bg-slate-200 rounded-3xl shadow-lg'>
                  <div className='p-10 text-2xl'>
                    <div className='flex justify-between'>
                      <div>{item.job}</div>
                      <div>{item.money}</div>
                    </div>
                    <div className='pt-4'>{item.address}</div>
                    <div className='pt-4'>{item.contact}</div>
                    <div className='pt-4'>{item.detail}</div>
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
