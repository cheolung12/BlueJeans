import React from 'react';

export default function BookCard({ thumbnail, title, author, description }) {
  return (
    <div>
      <img src={thumbnail} alt='book' className='w-1/3' />
      <div>{title}</div>
      <div>{author}</div>
      <div>{description}</div>
    </div>
  );
}
