import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
// import 'swiper/swiper-bundle.css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function LikedPost() {
    return (
        
             <Swiper
             className='h-60'
              slidesPerView={3}
              spaceBetween={30}
              navigation={true}
              pagination={true}
              loop={true}
              modules={[Navigation, Pagination]}
            >
              <SwiperSlide className='w-12 h-24 bg-red-600'>
                <div>
                    ㅇㅇㅇ
                </div>
              </SwiperSlide>
              <SwiperSlide className='w-12 h-12 bg-red-600'>
                Slide 2
              </SwiperSlide>
              
              <SwiperSlide className='w-12 h-12 bg-red-600'>Slide 3</SwiperSlide>
              <SwiperSlide className='w-12 h-12 bg-red-600'>Slide 4</SwiperSlide>
            
            </Swiper>
        
    );
}

