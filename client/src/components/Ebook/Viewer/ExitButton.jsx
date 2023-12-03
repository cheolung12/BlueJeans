import React from 'react';
import { Link } from 'react-router-dom';

export default function ExitButton() {
  return (
    <Link to='/ebook'>
      <div className='w-32 h-12 inline-flex items-center justify-center px-4 py-2  text-white bg-signatureColor font-semibold rounded-lg shadow-sm max-[640px]:w-[6rem] max-[640px]:h-[2.5rem] hover:opacity-90'>
        나가기
      </div>
    </Link>
  );
}
