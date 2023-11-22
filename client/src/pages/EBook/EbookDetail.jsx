import React from 'react';
import { useLocation } from 'react-router-dom';
import Title from '../../components/Ebook/Main/Title';
import BookCardDetail from '../../components/Ebook/Detail/BookCardDetail';

export default function EBookDetail() {
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
