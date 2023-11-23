import React from 'react';
import bookContents from '../../data/bookContents.json';
// import bookList from '../../data/bookList.json';
import BookViewer from '../../components/Ebook/Viewer/BookViewer';
import BookTitle from '../../components/Ebook/Viewer/BookTitle';
import ExitButton from '../../components/Ebook/Viewer/ExitButton';

export default function EBookViewer() {
  return (
    <div>
      <div className='flex justify-end m-3'>
        <ExitButton />
      </div>
      <BookTitle />
      <BookViewer data={bookContents.bookContents} />
    </div>
  );
}
