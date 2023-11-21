import React from 'react';
import SearchBooks from '../../components/Ebook/Main/SearchBooks';
import Filter from '../../components/Ebook/Main/Filter';
import Title from '../../components/Ebook/Main/Title';
import { useParams, Link } from 'react-router-dom';
import bookList from '../../data/bookList.json';
import BookCard from '../../components/Ebook/Main/BookCard';
import BookCardSearch from '../../components/Ebook/Main/BookCardSearch';

const books = bookList.books;

export default function EBook() {
  const { searchInput } = useParams();

  //검색어가 있는 경우 필터링된 목록 보여주기
  const filterBooks = searchInput
    ? books.filter(
        (book) =>
          book.title.includes(searchInput) || book.author.includes(searchInput)
      )
    : books;

  return (
    <section className='px-[11rem]'>
      <div>
        <Title />
        <div className='flex items-center justify-between px-8'>
          <Filter />
          <SearchBooks book={books} />
        </div>


        <div className='flex flex-wrap justify-center'>
          <>
            {filterBooks.map((book) => (
              <Link
                to={`/ebook/detail/${book.id}`}
                className='p-2'
                key={book.id}
              >
                {searchInput ? (
                  <BookCardSearch
                    id={book.id}
                    thumbnail={book.thumbnail}
                    title={book.title}
                    author={book.author}
                  />
                ) : (

                  <BookCard
                    id={book.id}
                    thumbnail={book.thumbnail}
                    title={book.title}
                    author={book.author}
                  />
                )}
              </Link>
            ))}
          </>
        </div>
      </div>
    </section>
  );
}
