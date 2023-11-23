import React from 'react';
import { useParams } from 'react-router-dom';

export default function BookTitle({ data }) {
  const { bookId } = useParams();

  return (
    <div className='flex justify-center mt-8'>
      <h1 className='text-2xl font-semibold'>{data[1].title}</h1>
    </div>
  );
}
