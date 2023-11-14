import React from 'react';
import bookList from '../../../data/bookList.json';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const books = bookList.books;

export default function SearchBookCard() {
  const { searchInput } = useParams();
  const navigate = useNavigate();

  const bookClick = (bookId) => {
    navigate(`/ebook/detail/${bookId}`);
  };
  const filterBooks = books.filter(
    (book) =>
      book.title.includes(searchInput) || book.author.includes(searchInput)
  );

  return (
    <div>
      <p>{`'${searchInput}'의 검색결과`}</p>

      <div className='flex'>
        {filterBooks.length > 0 ? (
          filterBooks.map((book) => (
            <div
              key={book.id}
              className='w-1/5 p-2'
              onClick={() => bookClick(book.id)}
            >
              <img src={book.thumbnail} alt='book' />
            </div>
          ))
        ) : (
          <p>검색 결과가 없습니다.</p>
        )}
      </div>
    </div>
  );
}
