import React, { useState } from 'react';
import bookList from '../../../data/bookList.json';
import { useNavigate } from 'react-router-dom';

const books = bookList.books;

export default function SearchBooks() {
  const navigate = useNavigate();

  const [searchInput, setSearchInput] = useState('');
  const [bookLists, setBookLists] = useState([]);

  // 폼 제출
  const searchSubmit = (e) => {
    e.preventDefault();

    // 제목, 저자명 검색 필터
    const filterBooks = books.filter(
      (book) =>
        book.title.includes(searchInput) || book.author.includes(searchInput)
    );

    setBookLists(filterBooks);
    setSearchInput('');
    console.log(filterBooks);

    //검색어 페이지로 이동
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
