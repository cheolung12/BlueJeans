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
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Pagination, Navigation } from 'swiper/modules';

export default function Main({ id, thumbnail, title }) {
  const booksArray = Object.values(books);

  const [swiperRef, setSwiperRef] = useState(null);
  let appendNumber = 4;
  let prependNumber = 1;

  const prepend2 = () => {
    swiperRef.prependSlide([
      '<div class="swiper-slide">Slide ' + --prependNumber + '</div>',
      '<div class="swiper-slide">Slide ' + --prependNumber + '</div>',
    ]);
  };

  const prepend = () => {
    swiperRef.prependSlide(
      '<div class="swiper-slide">Slide ' + --prependNumber + '</div>'
    );
  };

  const append = () => {
    swiperRef.appendSlide(
      '<div class="swiper-slide">Slide ' + ++appendNumber + '</div>'
    );
  };

  const append2 = () => {
    swiperRef.appendSlide([
      '<div class="swiper-slide">Slide ' + ++appendNumber + '</div>',
      '<div class="swiper-slide">Slide ' + ++appendNumber + '</div>',
    ]);
  };
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty('--progress', 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };

  return (
    <div>
      <div>
        <div className=' h-[700px] w-full'></div>

        <div className=' flex justify-center'>
          <div className=' rounded-[30px] shadow-md items-center flex justify-around bg-white h-24 w-3/4 mb-16 '>
            <Link to='/recruitment' className=''>
              <p className='text-[#FE8080]'>
                <IoMdBriefcase className='' />
                일자리
              </p>
            </Link>

            <Link to='/ebook' className=''>
              <p className='text-[#FED001]'>
                <FiBookOpen />
                e-book
              </p>
            </Link>

            <Link to='/essay' className=''>
              <p className='text-[#5495B1]'>
                <FaPenNib />
                백일장
              </p>
            </Link>
            <Link to='/chat' className=''>
              <p className='text-[#6694D5]'>
                <MdChat />
                챗봇
              </p>
            </Link>
            <Link to='/findhome' className=''>
              <p className='text-[#8D62E9]'>
                <GoHome />
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
              <div className=' text-lg'>
                <p className='pb-3'>1970년대의 감성부터 현대까지</p>
                <p className='pb-3'>지금 봐도 세련된 문장으로 감동을 주는</p>
                <p className='pb-3'>작품을 만나 보세요</p>
              </div>
            </div>
          </div>

          {/* books.thumbnail이랑 books.name 가져오기*/}

          <Swiper
            className='w-3/5 h-3/4 self-center'
            onSwiper={setSwiperRef}
            slidesPerView={3}
            loop={true}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            onAutoplayTimeLeft={onAutoplayTimeLeft}
            spaceBetween={30}
            navigation={true}
            modules={[Pagination, Navigation]}
          >
            {/* {booksArray.map((value) => {
              return value.map((book) => console.log(book.title));
            })} */}

            {booksArray.map((value) =>
              value.map(
                (book) => (
                  console.log(book),
                  (
                    <React.Fragment key={book.id}>
                      <SwiperSlide className='h-72 w-40 bg-slate-300'>
                        <div>
                          <img
                            src={book.thumbnail}
                            alt={book.title || 'No Title'}
                            className='h-full w-full text-blue-700'
                          />
                        </div>
                        <div className='text-white'>
                          {book.title || 'No Title'}
                        </div>
                        <div className='text-white'>{book.title}</div>
                      </SwiperSlide>
                    </React.Fragment>
                  )
                )
              )
            )}
            <svg ref={progressCircle}>
              <circle cx='24' cy='24' r='20'></circle>
            </svg>
          </Swiper>
        </div>

        {/* 2 */}
        <div className='h-[37.5rem] bg-[#5495B1] flex relative '>
          <div className='w-2/3 self-center flex ml-28'>
            <div>
              <div className='rounded-full w-80 h-80 bg-green-200'></div>
              <div className='text-lg text-center'>이름or닉네임</div>
              <div className='text-2xl text-center'>책이름</div>
            </div>

            <div className=' place-items-end self-end pl-5'>
              <div className='rounded-full w-64 h-64  bg-red-50'></div>
              <div className='text-lg text-center'>이름or닉네임</div>
              <div className='text-2xl text-center'>책이름</div>
            </div>

            <div className=' place-items-end self-end pl-5'>
              <div className='rounded-full w-64 h-64 bottom-0 bg-red-50'></div>
              <div className='text-lg text-center'>이름or닉네임</div>
              <div className='text-2xl text-center'>책이름</div>
            </div>
          </div>
          <div className='flex w-1/4 justify-center items-center'>
            <p className='text-4xl font-bold text-white'>이달의 문학왕</p>
          </div>
        </div>
        {/* 3 */}
        <div className='h-[37.5rem] bg-[#F28080] flex'>
          <div className='w-1/3'>
            <div className=' bg-emerald-200 h-16 w-11'>1</div>
          </div>
          <div className='w-1/3'>
            <div>2</div>
          </div>
          <div className='w-1/3'>
            <div>3</div>
          </div>
        </div>
      </div>
    </div>
  );
}
