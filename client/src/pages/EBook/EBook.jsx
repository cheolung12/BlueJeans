import React, { useEffect, useState } from 'react';
import SearchBooks from '../../components/Ebook/Main/SearchBooks';
import Filter from '../../components/Ebook/Main/Filter';
// import bookList from '../../data/bookList.json';
import BookCard from '../../components/Ebook/Main/BookCard';
import BookCardSearch from '../../components/Ebook/Main/BookCardSearch';
import axios from 'axios';

// 임시데이터
// const books = bookList.books;

export default function EBook() {
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
  // 1. 책 목록 전체 보여주기
  // 2. 검색한 책 목록만 보여주기 => useParams
  // const navigate = useNavigate();

  // get 요청 (전체 책 목록)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios({
          method: 'GET',
          url: `${process.env.REACT_APP_SERVER}/ebook`,
          // url: 'http://localhost:8080/api/ebook',
        });
        setBooks(response.data);
        console.log(response.data);
        setBookLength(response.data.length);
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
    <div className='flex w-[93%] justify-end max-[375px]:w-full'>
      <div className='flex flex-col items-center sm:w-[850px]'>
        {/* <div className='w-full'>
          <Title />
        </div> */}
        <div className='flex justify-center sm:w-5/6'>
          <div className='w-full sm:w-[61rem]'>
            {/* 카테고리, 검색창 */}
            <div className='flex flex-col sm:flex-row items-center justify-between px-4'>
              <Filter handleFilter={handleFilter} />
              <SearchBooks
                book={books}
                setBooks={setBooks}
                searchInput={searchInput}
                setSearchInput={setSearchInput}
              />
            </div>

            <section>
              <div className='py-3'>
                <div className='flex flex-wrap justify-between w-full sm:w-[900px] max-[375px]:justify-center'>
                  {books.map((book) => (
                    <div>
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
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
