import React from 'react';

export default function BookTitle({ title }) {
  return (
    <div className='flex justify-center'>
      <h1 className='text-3xl font-semibold'>{title}</h1>
    </div>
  );
}
