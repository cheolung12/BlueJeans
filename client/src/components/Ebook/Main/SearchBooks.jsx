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
      <form onSubmit={searchSubmit}>
        <input
          type='text'
          placeholder='제목, 작가를 입력하세요'
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button disabled={searchInput.length === 0}>검색</button>
      </form>
    </>
  );
}
