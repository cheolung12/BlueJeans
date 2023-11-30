import React from 'react';

export default function BookTitle({ title }) {
  return (
    <div className='flex justify-center'>
      <h1 className='text-3xl font-semibold max-[800px]:text-xl'>{title}</h1>
    </div>
  );
}
