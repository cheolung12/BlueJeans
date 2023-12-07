import React, { useEffect, useState } from 'react';
import SearchBooks from '../../components/Ebook/Main/SearchBooks';
import Filter from '../../components/Ebook/Main/Filter';
import BookCard from '../../components/Ebook/Main/BookCard';
import axios from 'axios';
import BookCardSkeleton from '../../components/Ebook/Main/BookCardSkeleton';
import MiniBookCard from '../../components/Ebook/Main/MiniBookCard';
import 'animate.css';

export default function EBook() {
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState([
    { title: '' },
    { id: '' },
    { author: '' },
    { thumbnail: '' },
    { like: 0 },
    { publisher: '' },
    { genre: '' },
    { description: '' },
  ]);
  const [searchInput, setSearchInput] = useState('');
  const [bookLength, setBookLength] = useState(0);
  const [popularBook, setPopularBook] = useState([]);

  // get 요청 (전체 책 목록)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios({
          method: 'GET',
          url: `${process.env.REACT_APP_SERVER}/ebook`,
        });
        setBooks(response.data);
        console.log(response.data);
        setBookLength(response.data.length);
        setLoading(false);
        let popular = [...response.data].sort((a, b) => b.like - a.like);
        setPopularBook(popular.slice(0, 6));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  // 카테고리 (인기순, 최신순, 전체보기)
  const handleFilter = async (type) => {
    let endPoint;

    // searchInput이 있고, 검색란에 값이 입력만 되어 있을 경우
    if (searchInput && bookLength === books.length) {
      if (type === 'all') {
        endPoint = '';
      } else {
        endPoint = `?sort=${type}`;
      }
    } else if (searchInput && bookLength > books.length) {
      // 검색이 된 상태에서 필터를 할 경우
      if (type === 'all') {
        endPoint = `?search=${searchInput}`;
      } else {
        endPoint = `?search=${searchInput}&sort=${type}`;
      }
    }
    // searchInput이 비어있을 경우
    else if (!searchInput.length) {
      if (type === 'all') {
        endPoint = ``;
      } else {
        endPoint = `?&sort=${type}`;
      }
    }
    console.log('엔드포인트', endPoint);

    const res = await axios({
      method: 'GET',
      url: `${process.env.REACT_APP_SERVER}/ebook${endPoint}`,
    });

    if (res.data.length !== 0) {
      setBooks(res.data);
    } else {
      setBooks('검색결과가 없습니다.');
    }
  };

  return (
    <div className='w-full'>
      <div className='flex flex-col justify-center w-full pl-0 lg:pl-[233px] items-center lg:items-start'>
        <div
          className='w-[96%] h-72 relative rounded-3xl'
          style={{
            backgroundImage:
              'url("https://bluejeansbucket2.s3.ap-northeast-2.amazonaws.com/ebook/KakaoTalk_Image_2023-12-04-22-08-30.jpeg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div
            className='w-full h-full flex justify-center items-center md:items-start absolute inset-0 overflow-hidden rounded-3xl'
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
          >
            <div className='flex flex-col justify-start w-full pl-0 md:pl-6 pt-6'>
              <div className='text-white text-3xl md:text-5xl text-center md:text-start font-bold pb-3 animate__animated animate__fadeInDown '>
                내 손안의 작은 도서관
              </div>
              <div className='text-white text-xl md:text-3xl text-center md:text-start animate__animated animate__fadeInDown'>
                어디서든 즐겨 보세요!
              </div>
            </div>
          </div>
        </div>

        <br />
        <br />

        {/* 인기도서 */}
        <div
          className='justify-center w-[95%] h-full font-bold relative pl-2 pt-0.5 hidden lg:flex'
          // style={{
          //   boxShadow: ' rgba(0, 0, 0, 0.15) 0px 5px 15px 0px',
          // }}
        >
          <div className='flex flex-col w-full h-full justify-evenly '>
            <p className='font-bold leading-9 mb-2 text-xl ml-3'>
              지금 서점 추천 도서
            </p>
            <div className='flex flex-wrap justify-center sm:justify-between w-full'>
              {popularBook.map((book, index) => (
                <div key={index}>
                  {loading ? (
                    <BookCardSkeleton />
                  ) : (
                    <MiniBookCard
                      id={book.id}
                      thumbnail={book.thumbnail}
                      title={book.title}
                      author={book.author}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <br />
        <br />

        <div className='flex flex-col w-[95%] items-centers justify-center'>
          {/* 카테고리, 검색창 */}
          <div className='flex flex-col items-center justify-between lg:flex-row mb-5'>
            <Filter handleFilter={handleFilter} />
            <SearchBooks
              book={books}
              setBooks={setBooks}
              searchInput={searchInput}
              setSearchInput={setSearchInput}
            />
          </div>

          <div className='flex justify-center'>
            <div className='w-full'>
              <section>
                <div className='py-3'>
                  <div className='flex flex-wrap justify-around w-full'>
                    {books.map((book, index) => (
                      <div key={index}>
                        {loading ? (
                          <BookCardSkeleton />
                        ) : (
                          <BookCard
                            id={book.id}
                            thumbnail={book.thumbnail}
                            title={book.title}
                            author={book.author}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
