import React, { useEffect, useState } from 'react';
import SearchBooks from '../../components/Ebook/Main/SearchBooks';
import Filter from '../../components/Ebook/Main/Filter';
import Title from '../../components/Ebook/Main/Title';
import { useParams, Link, useNavigate } from 'react-router-dom';
// import bookList from '../../data/bookList.json';
import BookCard from '../../components/Ebook/Main/BookCard';
import BookCardSearch from '../../components/Ebook/Main/BookCardSearch';
import SideNavBar from '../../components/common/SideNavBar';
import axios from 'axios';

// 임시데이터
// const books = bookList.books;

export default function EBook() {
  const [books, setBooks] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  // 1. 책 목록 전체 보여주기
  // 2. 검색한 책 목록만 보여주기 => useParams
  const navigate = useNavigate();

  // get 요청 (전체 책 목록)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios({
          method: 'GET',
          url: `http://localhost:8080/api/ebook`,
        });
        setBooks(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  // 검색어가 있는 경우 필터링된 목록 보여주기
  // 검색어가 없다면 모든 책 리스트 보여주기
  const filterBooks = searchInput
    ? books.filter(
        (book) =>
          book.title.includes(searchInput) || book.author.includes(searchInput)
      )
    : books;

  // 카테고리 (인기순, 최신순, 전체보기)
  const handleFilter = async (type) => {
    let res;
    if (type === 'all') {
      try {
        res = await axios({
          method: 'GET',
          url: `http://localhost:8080/api/ebook`,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    } else {
      try {
        res = await axios({
          method: 'GET',
          url: `http://localhost:8080/api/ebook/order?orderby=${type}`,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    if (res) {
      console.log(res);
      setBooks(res.data);
    }
  };

  // 검색
  const handleSearch = (searchInput, results) => {
    setBooks(results);
    navigate(`/ebook/search?keyword=${searchInput}`);
  };

  return (
    <div>
      {/* 네브바 */}
      <SideNavBar />
      {/* e-book 제목 */}
      <Title />
      <div className='flex justify-center'>
        <div className='w-[61rem]'>
          {/* 카테고리, 검색창 */}
          <div className='flex flex-col sm:flex-row items-center justify-between px-4'>
            <Filter handleFilter={handleFilter} />
            <SearchBooks book={books} handleSearch={handleSearch} />
          </div>

          <section className='h-screen'>
            {/* {searchInput && (
              <div className='font-semibold text-xl text-center py-3'>{`'${searchInput}'의 검색결과`}</div>
            )} */}
            <div className='py-3'>
              <div className='flex flex-wrap justify-center'>
                {filterBooks.length === 0 ? (
                  <>
                    <div className='font-semibold text-xl text-center py-3'>
                      검색결과가 없습니다.
                    </div>
                  </>
                ) : (
                  filterBooks.map((book) => (
                    // 북카드 클릭시 e-book 상세 페이지로 이동
                    <Link
                      to={`/ebook/detail/${book.id}`}
                      // state로 책 데이터 전달 => useLocation으로 받음
                      state={{ dataDetail: book }}
                      className='p-2'
                      key={book.id}
                    >
                      {searchInput ? (
                        <>
                          <BookCardSearch
                            id={book.id}
                            thumbnail={book.thumbnail}
                            title={book.title}
                            author={book.author}
                          />
                        </>
                      ) : (
                        <BookCard
                          id={book.id}
                          thumbnail={book.thumbnail}
                          title={book.title}
                          author={book.author}
                        />
                      )}
                    </Link>
                  ))
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
