import React from 'react';
import { FaHeart } from 'react-icons/fa';

export default function BookCard({ id, thumbnail, title, author }) {
  return (
    <div>
      <div key={id} className='w-1/5 p-2'>
        <img src={thumbnail} alt='book' />
        <div>{title}</div>
        <div>{author}</div>
        <div>
          <FaHeart /> <p>10</p>
        </div>
      </div>
    </div>
  );
}
