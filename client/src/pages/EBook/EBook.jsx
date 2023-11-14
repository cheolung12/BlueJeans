import React from 'react';
import SearchBooks from '../../components/Ebook/Main/SearchBooks';
import Filter from '../../components/Ebook/Main/Filter';
import Title from '../../components/Ebook/Main/Title';
import BookCard from '../../components/Ebook/Main/BookCard';
import SearchBookCard from '../../components/Ebook/Main/SearchBookCard';
import { useParams } from 'react-router-dom';

export default function EBook() {
  const { searchInput } = useParams();

  return (
    <section>
      <div>
        <Title />
        <Filter />
        <SearchBooks />
        <div>{searchInput ? <SearchBookCard /> : <BookCard />}</div>
      </div>
    </section>
  );
}
