import React from 'react';
import { useParams } from 'react-router-dom';
import bookList from '../../data/bookList.json';
import Title from '../../components/Ebook/Main/Title';
import ResButton from '../../components/Ebook/Detail/ResButton';
import { Link } from 'react-router-dom';
import BookCardDetail from '../../components/Ebook/Detail/BookCardDetail';

const books = bookList.books;

export default function EBookDetail() {
  const { bookId } = useParams();
  // map 대신 find 사용
  const findBook = books.find((book) => book.id === bookId);

  return (
    <div>
      <Title />
      <div>
        {findBook ? (
          <div key={findBook.id}>
            <BookCardDetail
              thumbnail={findBook.thumbnail}
              title={findBook.title}
              author={findBook.author}
              description={findBook.description}
            />
          </div>
        ) : null}
      </div>
      <div className='flex justify-center'>
        <ResButton text='찜하기' />
        <Link to={`/ebook/detail/viewer/${findBook.id}`} key={findBook.id}>
          <ResButton text='바로 읽기' />
        </Link>
      </div>
    </div>
  );
}
