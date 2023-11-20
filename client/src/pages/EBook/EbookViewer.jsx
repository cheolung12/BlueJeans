import React from 'react';
import bookContents from '../../data/bookContents.json';
import BookViewer from '../../components/Ebook/Viewer/BookViewer';
import BookTitle from '../../components/Ebook/Viewer/BookTitle';
import Title from '../../components/Ebook/Main/Title';

export default function EBookViewer() {
  return (
    <div>
      <Title />
      <BookTitle />
      <BookViewer data={bookContents.bookContents} />
    </div>
  );
}
