import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchBooks({ book }) {
  const navigate = useNavigate();

  const [searchInput, setSearchInput] = useState('');
  const [bookLists, setBookLists] = useState([]);

  const searchSubmit = (e) => {
    e.preventDefault();

    // 제목, 작가 검색
    const filterBooks = book.filter(
      (book) =>
        book.title.includes(searchInput) || book.author.includes(searchInput)
    );

    setBookLists(filterBooks);
    setSearchInput('');
    console.log(filterBooks);

    navigate(`/ebook/keyword/${searchInput}`);
  };

  return (
    <>
      <form onSubmit={searchSubmit} className='flex items-center'>
        <input
          type='text'
          placeholder='제목, 작가를 입력하세요'
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className='border rounded-full w-[13rem] h-[2.2rem] border-gray-300 outline-none pl-3 text-sm'
        />
        <button
          disabled={searchInput.length === 0}
          className='ml-[-2.5rem] w-[2rem] h-[2rem] flex items-center justify-center cursor-pointer'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
          >
            {' '}
            <path
              fill-rule='evenodd'
              clip-rule='evenodd'
              d='M15.1991 6.74703C12.865 4.4131 9.08077 4.4131 6.74668 6.74703C4.41256 9.08098 4.41256 12.8651 6.74668 15.199C8.90131 17.3535 12.2917 17.5192 14.6364 15.696L17.9384 18.9978L18.999 17.9371L15.6969 14.6353C17.5194 12.2908 17.3535 8.90121 15.1991 6.74703ZM7.8073 7.80772C9.55561 6.05953 12.3902 6.05953 14.1385 7.80772C15.8868 9.55588 15.8868 12.3902 14.1385 14.1383C12.3902 15.8865 9.55561 15.8865 7.8073 14.1383C6.05902 12.3902 6.05902 9.55588 7.8073 7.80772Z'
              fill='#222222'
            />{' '}
          </svg>
        </button>
      </form>
    </>
  );
}
