import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Title from '../../components/Ebook/Main/Title';
import BookCardDetail from '../../components/Ebook/Detail/BookCardDetail';

export default function EBookDetail() {
  const { bookId } = useParams();
  // map 대신 find 사용
  // const findBook = books.find((book) => book.id === bookId);
  const location = useLocation();

  return (
    <div>
      <Title />
      <div>
        <div>
          <BookCardDetail data={location.state.dataDetail} />
        </div>
      </div>
    </div>
  );
}
