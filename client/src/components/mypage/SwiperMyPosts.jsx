import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import { v4 as uuidv4 } from 'uuid';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import { IoMdBriefcase } from 'react-icons/io';
import { FiBookOpen } from 'react-icons/fi';
import { FaPenNib } from 'react-icons/fa6';

export default function SwiperMyPosts({ postLists }) {
    return (
        <Swiper
            className="sm:w-[450px] md:w-[560px] w-[300px] sm:h-[440px] md:h-[515px] h-[335px]"
            slidesPerView={1}
            loop={true}
            centeredSlides={true}
            pagination={{
                dynamicBullets: true,
            }}
            navigation={true}
            spaceBetween={10}
            modules={[Navigation, Pagination]}
        >
            {postLists &&
                postLists.map((post) => (
                    <SwiperSlide className="w-full" key={uuidv4()}>
                        <Link
                            to={`/${post.type}/detail/${post.id}`}
                            className="w-full aspect-[1.5/1] border shadow-lg rounded-md flex flex-col justify-evenly"
                        >
                            {post.img_path ? (
                                <div
                                    className="w-full h-full overflow-hidden text-center bg-cover bg-no-repeat bg-center mb-4 rounded-t-md"
                                    style={{ backgroundImage: `url("${post.img_path}")` }}
                                ></div>
                            ) : (
                                <Skeleton className="w-full h-36 mb-4" />
                            )}
                            <div className="p-2">
                                <div className="flex flex-col">
                                    {post.type ? (
                                        <div className="flex mb-2">
                                            {post.type === 'ebook' && (
                                                <span className="flex items-center">
                                                    <FiBookOpen className="mr-2 text-[#FED001]" />
                                                    e-book
                                                </span>
                                            )}
                                            {post.type === 'recruitment' && (
                                                <span className="flex items-center">
                                                    <IoMdBriefcase className="mr-2 text-[#FE8080]" />
                                                    일자리
                                                </span>
                                            )}
                                            {post.type === 'essay' && (
                                                <span className="flex items-center">
                                                    <FaPenNib className="mr-2 text-[#6694D5]" />
                                                    에세이
                                                </span>
                                            )}
                                        </div>
                                    ) : (
                                        <Skeleton className="w-full" />
                                    )}
                                    {post.title ? (
                                        <div
                                            className="font-semibold text-lg overflow-ellipsis whitespace-no-wrap mb-2"
                                            style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}
                                        >
                                            {post.title}
                                        </div>
                                    ) : (
                                        <Skeleton className="w-full" />
                                    )}
                                </div>
                            </div>
                        </Link>
                    </SwiperSlide>
                ))}
        </Swiper>
    );
}
