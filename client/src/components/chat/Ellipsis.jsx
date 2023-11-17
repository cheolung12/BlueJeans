import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';

export default function Ellipsis({ inputText, isLoading }) {
  return (
    <>
      {(inputText || isLoading) && (
        <div
          className={`${inputText && 'ml-auto'} ${
            isLoading && 'mr-auto'
          } px-2 py-1`}
        >
          <FontAwesomeIcon icon={faEllipsis} fade size='3x' />
        </div>
      )}
    </>
  );
}
