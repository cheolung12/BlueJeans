import React from 'react';
import { useParams, useLocation } from 'react-router-dom';

export default function BookTitle() {
  const location = useLocation();

  // const { bookId } = useParams();

  return (
    <div className='flex justify-center mt-20'>
      <h1 className='text-3xl font-semibold'>{location.state.title}</h1>
    </div>
  );
}
