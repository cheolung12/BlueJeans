import React, { useState } from 'react';
import bookList from '../../../data/bookList.json';
import { useNavigate } from 'react-router-dom';

const books = bookList.books;

function SearchBooks() {
  const navigate = useNavigate();

  const [searchInput, setSearchInput] = useState('');
  const [bookLists, setBookLists] = useState([]);

  const searchSubmit = (e) => {
    e.preventDefault();
    // navigate(`/ebook/keword/${searchInput}`);

    const filteredBooks = books.filter(
      (book) =>
        book.title.includes(searchInput) || book.author.includes(searchInput)
    );

    setBookLists(filteredBooks);
    setSearchInput('');
    console.log(filteredBooks);
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

      {bookLists.map((book) => {
        <ul>
          <li>{book.thumbnail}</li>
        </ul>;
      })}
    </>
  );
}

export default SearchBooks;
