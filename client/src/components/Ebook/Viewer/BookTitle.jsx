import React from 'react';
import { useParams } from 'react-router-dom';

export default function BookTitle() {
  const { bookId } = useParams();

  return (
    <div className='flex justify-center'>
      <h1 className='text-2xl'>{bookId}</h1>
    </div>
  );
}
