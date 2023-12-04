import React from 'react';
import { Link } from 'react-router-dom';
import { IoMdHeartEmpty } from 'react-icons/io';
import { FaRegComments } from 'react-icons/fa6';

export default function EssayCard({
  id,
  title,
  thumbnail,
  nickname,
  like,
  comments,
}) {
  return (
    <div className='transition-transform hover:ease-linear transform hover:scale-105'>
      <Link to={`/essay/detail/${id}`}>
        <div
          className='w-[17rem] h-[20rem] m-2 flex flex-col rounded-br-2xl bg-white'
          style={{
            boxShadow: 'rgba(99, 99, 99, 0.2) 1px 3px 8px 0px',
            // boxShadow:
            //   'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px',

            // boxShadow:
            //   'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset',
            // boxShadow:
            //   ' rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px',
          }}
        >
          <div className='w-full h-[9rem]'>
            <div className='w-full h-[14.6rem] rounded-br-2xl '>
              <img
                src={thumbnail}
                alt='백일장썸네일'
                className='w-full h-full object-cover'
              />
            </div>

            <div className='flex items-center'>
              <div className='flex flex-col w-full h-[5rem] justify-center pl-3'>
                <div className='text-xl font-bold'>{title}</div>
                <div className='text-sm text-[#8d8d8d]'>{nickname}</div>
              </div>

              <div>
                <div className='flex items-center'>
                  <div className='flex items-center mx-5'>
                    <IoMdHeartEmpty className='mx-1 text-lg' />
                    <div className='mx-[0.5px] text-lg'>{like}</div>
                  </div>
                  {/* <div className='flex items-center mx-2'>
                  <FaRegComments className='mx-1' />
                  <div className='mx-[0.5px]'>{comments}</div>
                </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
