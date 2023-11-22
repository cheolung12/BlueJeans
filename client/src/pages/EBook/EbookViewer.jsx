import React from 'react';

import bookContents from '../../data/bookContents.json';
import bookList from '../../data/bookList.json';
import BookViewer from '../../components/Ebook/Viewer/BookViewer';
import BookTitle from '../../components/Ebook/Viewer/BookTitle';
import ResButton from '../../components/common/ResButton';

export default function EBookViewer() {
  return (
    <div>
      <div className='flex justify-end m-3'>
        <ResButton text='나가기' width='7rem' height='2.8rem' />
      </div>
      <BookTitle data={bookList.books} />
      <BookViewer data={bookContents.bookContents} />
    </div>
  );
}
