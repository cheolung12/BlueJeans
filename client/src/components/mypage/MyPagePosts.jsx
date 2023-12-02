import React from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { IoMdBriefcase } from 'react-icons/io';
import { FiBookOpen } from 'react-icons/fi';
import { FaPenNib } from 'react-icons/fa6';

export default function MyPageSlider({ postLists }) {
  return (
    <>
      {postLists.map((post) => {
        return (
            <div className='w-4/5 mx-auto h-64 fade-in' key={uuidv4()}>
              <Link
                to={`/${post.type}/detail/${post.id}`}
                className='w-full h-full border shadow-lg rounded-md flex flex-col justify-evenly p-2'
              >
                {post.type ? (
                  <div className='flex  mb-2'>
                    {post.type === 'ebook' && (
                      <span className='flex items-center'>
                        <FiBookOpen className='mr-2 text-[#FED001]' />
                        e-book
                      </span>
                    )}
                    {post.type === 'recruitment' && (
                      <span className='flex items-center'>
                        <IoMdBriefcase className='mr-2 text-[#FE8080]' />
                        일자리
                      </span>
                    )}
                    {post.type === 'essay' && (
                      <span className='flex items-center'>
                        <FaPenNib className='mr-2 text-[#6694D5]' />
                        에세이
                      </span>
                    )}
                  </div>
                ) : (
                  <Skeleton className='w-full' />
                )}
                {post.img_path ? (
                  <div
                    className='w-full h-36 text-center bg-cover bg-no-repeat bg-center mb-4'
                    style={{ backgroundImage: `url("${post.img_path}")` }}
                  ></div>
                ) : (
                  <Skeleton className='w-full h-36 mb-4' />
                )}
                {post.title ? (
                  <div
                    className='font-semibold text-lg overflow-ellipsis whitespace-no-wrap'
                    style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}
                  >
                    {post.title}
                  </div>
                ) : (
                  <Skeleton className='w-full' />
                )}
              </Link>
            </div>
        );
      })}
    </>
  );
}
