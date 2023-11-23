import React, { useEffect } from 'react';
import SearchBooks from '../../components/Ebook/Main/SearchBooks';
import Filter from '../../components/Ebook/Main/Filter';
import Title from '../../components/Ebook/Main/Title';
import { useParams, Link } from 'react-router-dom';
import bookList from '../../data/bookList.json';
import BookCard from '../../components/Ebook/Main/BookCard';
import BookCardSearch from '../../components/Ebook/Main/BookCardSearch';
import SideNavBar from '../../components/common/SideNavBar';
import axios from 'axios';

// 임시데이터
const books = bookList.books;

export default function EBook() {
  // 1. 책 목록 전체 보여주기
  // 2. 검색한 책 목록만 보여주기 => useParams
  const { searchInput } = useParams();

  // get 요청
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios({
  //         method: 'GET',
  //         url: ``,
  //       });
  //       console.log(response);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  // 검색어가 있는 경우 필터링된 목록 보여주기
  // 검색어가 없다면 모든 책 리스트 보여주기
  const filterBooks = searchInput
    ? books.filter(
        (book) =>
          book.title.includes(searchInput) || book.author.includes(searchInput)
      )
    : books;

  return (
    <div>
      {/* 네브바 */}
      <SideNavBar />
      {/* e-book 제목 */}
      <Title />
      <div className='flex justify-center'>
        <div className='w-[61rem]'>
          {/* 카테고리, 검색창 */}
          <div className='flex items-center justify-between px-4'>
            <Filter />
            <SearchBooks book={books} />
          </div>

          <section>
            {searchInput && (
              <div className='font-semibold text-xl text-center py-3'>{`'${searchInput}'의 검색결과`}</div>
            )}
            <div className='py-6'>
              <div className='flex flex-wrap justify-center'>
                <>
                  {filterBooks.map((book) => (
                    // 북카드 클릭시 e-book 상세 페이지로 이동
                    <Link
                      to={`/ebook/detail/${book.id}`}
                      // state로 책 데이터 전달 => useLocation으로 받음
                      state={{ dataDetail: book }}
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
        </div>
      </div>
    </div>
  );
}
