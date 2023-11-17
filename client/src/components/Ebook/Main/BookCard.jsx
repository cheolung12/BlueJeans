import React from 'react';
import bookList from '../../../data/bookList.json';
import { useNavigate } from 'react-router-dom';

const books = bookList.books;

export default function BookCard() {
    const navigate = useNavigate();

    const bookClick = (bookId) => {
        navigate(`/ebook/detail/${bookId}`);
    };
    return (
        <div className="flex flex-wrap">
            {books.map((book) => (
                <div key={book.id} className="w-1/5 p-4" onClick={() => bookClick(book.id)}>
                    <img src={book.thumbnail} alt="book" />
                </div>
            ))}
        </div>
    );
}
