import React from 'react';

export default function BookCardDetail({
  thumbnail,
  title,
  author,
  description,
}) {
  return (
    <div>
      <div className='flex items-center'>
        <img src={thumbnail} alt='book' className='w-1/3' />
        <div>
          <div>{title}</div>
          <div>{author}</div>
          <div>{description}</div>
        </div>
      </div>
    </div>
  );
}
