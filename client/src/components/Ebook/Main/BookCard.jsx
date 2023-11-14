import React from 'react';
import bookList from '../../../data/bookList.json';

const books = bookList.books;

export default function BookCard() {
  return (
    <div className='flex'>
      {books.map((book) => (
        <div key={book.id}>
          <img src={book.thumbnail} alt='book' className='w-1/2' />
        </div>
      ))}
    </div>
  );
}
