import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';

export default function Ellipsis({ inputText, isLoading }) {
  return (
    <>
      {(inputText || isLoading) && (
        <div
          className={`
          ${isLoading && inputText || inputText && 'ml-auto'} 
          ${isLoading && 'mr-auto'} 
          px-2 py-1`
        }
        >
          <FontAwesomeIcon icon={faEllipsis} fade className='text-4xl' />
        </div>
      )}
    </>
  );
}
