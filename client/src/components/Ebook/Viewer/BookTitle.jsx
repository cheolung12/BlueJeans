import React from 'react';

export default function BookTitle({ title }) {
  return (
    <div className='flex justify-center'>
      <h1 className='text-xl sm:text-3xl font-semibold mt-3 mb-3'>{title}</h1>
    </div>
  );
}
