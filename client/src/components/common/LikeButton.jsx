import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';

export default function LikeButton() {
  return (
    <div className='flex flex-col items-center'>
      <FontAwesomeIcon
        icon={faHeart}
        style={{ color: '#000000' }}
        className='text-2xl'
      />
      <span className='pt-1'>찜하기</span>
    </div>
  );
}
