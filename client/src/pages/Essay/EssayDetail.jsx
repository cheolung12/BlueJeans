import React from 'react';
import SideNavBar from '../../components/common/SideNavBar';
import { useParams } from 'react-router-dom';
import LikeButton from '../../components/common/LikeButton';

export default function EssayDetail() {
  const { EssayId } = useParams();

  return (
    <div>
      <SideNavBar />
      <div className='text-center text-3xl'>백일장</div>

      <div className='w-full bg-slate-300'>
        {/* 백일장 상세 {EssayId} */}
        <section className='bg-slate-200 flex justify-center h-full'>
          <div className='w-[40rem] bg-slate-300 flex flex-col p-3'>
            <div className='flex flex-col h-20 justify-evenly'>
              <div className='w-full bg-slate-400 text-3xl font-bold'>
                제목{' '}
              </div>
              <div className='w-full bg-slate-400 text-lg font-semibold'>
                이름
              </div>
            </div>
            <div className='w-full h-96 bg-slate-100'>사진</div>
          </div>
        </section>
        <div className='my-4'>
          <LikeButton like='좋아요' notlike='좋아요' />
        </div>

        <section className='bg-slate-200 flex justify-center h-full'>
          <div className='w-[40rem] bg-slate-300 flex flex-col p-3'>
            <div className='w-full'>
              <form className='flex justify-around items-center'>
                <div>댓글</div>
                <input
                  className='w-5/6 h-11 px-2'
                  placeholder='댓글을 입력해주세요'
                />
                <button>작성</button>
              </form>
            </div>
            <div className='bg-slate-50 mt-3'>
              <div className='bg-slate-200 h-80'>
                <ul>
                  <li>댓글</li>
                  <li>댓글</li>
                  <li>댓글</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
