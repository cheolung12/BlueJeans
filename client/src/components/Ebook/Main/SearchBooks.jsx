import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SearchBooks({
  books,
  setBooks,
  searchInput,
  setSearchInput,
}) {
  const navigate = useNavigate();
  // 검색어 입력
  // 검색 기준과 일치하는 책 목록 저장
  // const [bookLists, setBookLists] = useState([]);

  // get요청
  // useEffect(() =>
  //   const fetchData = async () => {
  //     if (searchInput.trim() === '') {
  //       // 검색어가 비어있으면 데이터를 가져오지 않음
  //       setSearchResults([]);
  //       return;
  //     }
  //     try {
  //       const response = await axios({
  //         method: 'GET',
  //         url: `http://localhost:8080/api/ebook/search?keyword=${searchInput}`,
  //       });
  //       setSearchResults(response.data);
  //       console.log(response);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };
  //   fetchData();
  // }, [searchInput]);

  // 단일 페이지 내에서 이동
  // const navigate = useNavigate();

  // 폼 제출
  const searchSubmit = async (e) => {
    e.preventDefault();
    // setSearchInput('');

    try {
      const response = await axios({
        method: 'GET',
        url: `${process.env.REACT_APP_SERVER}/ebook?search=${searchInput}`,
        // url: `https://www.bluejeansu.site/ebook/search?keyword=${searchInput}`,
      });
      setBooks(response.data);

      console.log('검색 결과', response.data);
      navigate(`/ebook/search?keyword=${searchInput}`);
    } catch (error) {
      console.error('Error fetching data:', error);
    }

    // // 제목, 작가 검색
    // const filterBooks = book.filter(
    //   (book) =>
    //     book.title.includes(searchInput) || book.author.includes(searchInput)
    // );

    // // 필터링 된 책 목록
    // setSearchResults(filterBooks);
    // setSearchInput('');
    // console.log(filterBooks);

    // 검색어 페이지로 이동
    // navigate(`/ebook/keyword/${searchInput}`);
  };

  return (
    <div>
      <form onSubmit={searchSubmit} className='flex items-center'>
        <input
          type='text'
          placeholder='제목을 입력하세요'
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className='rounded-full w-80 h-[2.7rem] border-gray-300 outline-none pl-3 text-base border-2 focus:border-[#48599A]'
        />
        <button
          disabled={searchInput.length === 0}
          className='ml-[-2.5rem] mt-1 w-[2rem] h-[2rem] flex items-center justify-center cursor-pointer'
        >
          {/* 검색 아이콘 */}
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='30'
            height='30'
            viewBox='0 0 24 24'
            fill='none'
          >
            {' '}
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M15.1991 6.74703C12.865 4.4131 9.08077 4.4131 6.74668 6.74703C4.41256 9.08098 4.41256 12.8651 6.74668 15.199C8.90131 17.3535 12.2917 17.5192 14.6364 15.696L17.9384 18.9978L18.999 17.9371L15.6969 14.6353C17.5194 12.2908 17.3535 8.90121 15.1991 6.74703ZM7.8073 7.80772C9.55561 6.05953 12.3902 6.05953 14.1385 7.80772C15.8868 9.55588 15.8868 12.3902 14.1385 14.1383C12.3902 15.8865 9.55561 15.8865 7.8073 14.1383C6.05902 12.3902 6.05902 9.55588 7.8073 7.80772Z'
              fill='#222222'
            />{' '}
          </svg>
        </button>
      </form>
    </div>
  );
}
