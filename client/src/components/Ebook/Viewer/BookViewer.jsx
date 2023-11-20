import React, { useState } from 'react';

export default function BookViewer({ data }) {
  const [slide, setSlide] = useState(0);

  return (
    <div className='flex  px-30'>
      <div>
        <div className=''>이전 페이지</div>
        <div className='bg-slate-100 flex'>
          {data.map((item) => (
            <>
              <div className='flex'>
                <div
                  className='bg-slate-300 w-96 h-[32rem] border-neutral-900 border-2'
                  key={item.id}
                >
                  {item.content}
                </div>
                <div
                  className='bg-slate-300 w-96 h-[32rem] border-neutral-900 border-2'
                  key={item.id}
                >
                  {item.content}
                </div>
              </div>
            </>
          ))}
        </div>
        <div>다음 페이지</div>
        <span className='flex'>
          {data.map((_, idx) => (
            <button key={idx} onClick={null}>
              버튼
            </button>
          ))}
        </span>
      </div>
    </div>
  );
}
