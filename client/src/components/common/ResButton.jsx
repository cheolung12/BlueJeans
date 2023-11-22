import React from 'react';

export default function ResButton({ text, width, height }) {
  const style = { width, height };

  return (
    <div>
      <div
        className='w-[11rem] h-[3rem] inline-flex items-center justify-center px-4 py-2  text-white bg-black rounded-lg shadow-sm'
        style={style}
      >
        {text}
      </div>
    </div>
  );
}
