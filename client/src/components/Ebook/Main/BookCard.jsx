import React from 'react';
import bookList from '../../../data/bookList.json';

const books = bookList.books;

export default function BookCard() {
  return (
    <div className='flex flex-wrap'>
      {books.map((book) => (
        <div key={book.id} className='w-1/5 p-4'>
          <img src={book.thumbnail} alt='book' />
        </div>
      ))}
    </div>
  );
}
