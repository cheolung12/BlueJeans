import React from 'react';
import SearchBooks from '../../components/Ebook/Main/SearchBooks';
import Filter from '../../components/Ebook/Main/Filter';
import Title from '../../components/Ebook/Main/Title';
import BookCard from '../../components/Ebook/Main/BookCard';

export default function EBook() {
  return (
    <section>
      <div>
        <Title />
        <Filter />
        <SearchBooks />
        <BookCard />
        <div></div>
      </div>
    </section>
  );
}
