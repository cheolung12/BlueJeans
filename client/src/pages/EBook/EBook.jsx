import React from 'react';
import SearchBooks from '../../components/Ebook/Main/SearchBooks';
import Filter from '../../components/Ebook/Main/Filter';
import Title from '../../components/Ebook/Main/Title';
import { useParams, Link } from 'react-router-dom';
import bookList from '../../data/bookList.json';
import BookCard from '../../components/Ebook/Main/BookCard';

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
    <section>
      <div>
        <Title />
        <Filter />
        <SearchBooks book={books} />
        <div className='flex flex-wrap'>
          {filterBooks.length > 0 ? (
            <>
              {searchInput && <p>{`'${searchInput}'의 검색결과`}</p>}
              {filterBooks.map((book) => (
                <Link to={`/ebook/detail/${book.id}`} class='w-1/5 p-2'>
                  <BookCard
                    id={book.id}
                    thumbnail={book.thumbnail}
                    title={book.title}
                    author={book.author}
                  />
                </Link>
              ))}
            </>
          ) : (
            <div>
              <div>{`'${searchInput}'의 검색결과`}</div>
              <p>검색결과가 없습니다.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
