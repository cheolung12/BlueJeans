import React from 'react';

export default function ResButton({ text, width }) {
  const style = { width };

  return (
    <div>
      <div
        className='w-[11rem] h-[3rem] inline-flex items-center justify-center px-4 py-2 text-white bg-signatureColor rounded-lg shadow-sm font-semibold'
        style={style}
      >
        {text}
      </div>
    </div>
  );
}
