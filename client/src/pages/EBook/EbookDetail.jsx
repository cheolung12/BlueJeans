import React from 'react';
import { useParams } from 'react-router-dom';
import bookList from '../../data/bookList.json';
import BookCard from '../../components/Ebook/Detail/BookCard';
import ResButton from '../../components/common/ResButton';

const books = bookList.books;

export default function EBookDetail() {
  const { bookId } = useParams();

  return (
    <div>
      <div>책 아이디 : {bookId}</div>
      {books.map((book) => (
        <div key={book.id}>
          {book.id === bookId ? (
            <div>
              <BookCard
                thumbnail={book.thumbnail}
                title={book.title}
                author={book.author}
                description={book.description}
              />
            </div>
          ) : null}
        </div>
      ))}
      <ResButton />
    </div>
  );
}
