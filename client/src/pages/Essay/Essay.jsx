import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
// import essay from '../../data/essay.json';
import EssayCard from '../../components/Essay/Main/EssayCard';
import ResButton from '../../components/common/ResButton';
import { useState } from 'react';
import axios from 'axios';
import Filter from '../../components/Ebook/Main/Filter';
import Pagination from 'react-js-pagination';
import EssayCardSkeleton from '../../components/Essay/Main/EssayCardSkeleton';

// 백일장 임시데이터
// const essays = essay.essays;

export default function Essay() {
  const [loading, setLoading] = useState(true);

  const [filtered, setFiltered] = useState([
    { title: '' },
    { content: '' },
    { user_id: '' },
    { img_path: '' },
    { like: 0 },
    { created_at: '' },
    { updated_at: '' },
    { nickname: '' },
    { comments: '' },
  ]);

  const [searchInput, setSearchInput] = useState('');
  const [essayInits, setEssayInits] = useState([]);

  // 페이지네이션
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9); // 페이지당 아이템 수

  // 현재 페이지의 데이터 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filtered.slice(indexOfFirstItem, indexOfLastItem);

  // 페이지 변경 처리
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    scrollToTop(); // 페이지 변경 후 페이지 상단으로 스크롤
  };

  // 페이지 상단으로 스크롤하는 함수
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // get 요청
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios({
          method: 'GET',
          url: `${process.env.REACT_APP_SERVER}/essays`,
        });
        console.log(response); // 받은 데이터를 상태에 업데이트
        let essays = response.data;
        let latestEssays = [...essays].sort((a, b) =>
          b.created_at.localeCompare(a.created_at)
        );
        setFiltered(latestEssays);
        setEssayInits(latestEssays);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchdata();
  }, []);

  // 카테고리 (인기순, 최신순, 전체보기)
  const handleFilter = async (type) => {
    if (type === 'all') {
      try {
        setFiltered(essayInits);
      } catch (error) {
        console.error('정렬에러', error);
      }
    }
    if (type === 'latest') {
      try {
        let temp = [...filtered].sort((a, b) =>
          b.created_at.localeCompare(a.created_at)
        );
        setFiltered(temp);
        console.log(temp);
      } catch (error) {
        console.error('정렬에러', error);
      }
    }
    if (type === 'likes') {
      try {
        let popular = [...filtered].sort((a, b) => b.like - a.like);
        setFiltered(popular);
        console.log(popular);
      } catch (error) {
        console.error('정렬에러', error);
      }
    }
  };

  const handleLogin = () => {
    if (!window.localStorage.getItem('userID')) {
      alert('로그인이 필요합니다.');
    }
  };

  // 검색제출
  const searchSubmit = async (e) => {
    e.preventDefault();

    // 제목, 작가 검색
    const searchEssays = essayInits.filter(
      (essay) =>
        essay.title.includes(searchInput) ||
        essay.nickname.includes(searchInput)
    );
    setSearchInput('');
    setFiltered(searchEssays);
    console.log(searchEssays);
  };

  return (
    <div className='w-full flex justify-center'>
      <section className='flex flex-col items-center w-full justify-end'>
        <div className='flex flex-col justify-end w-[72%]'>
          <div className='flex w-full'>
            <nav className='flex flex-col lg:flex-row w-full justify-between items-center mb-4 sm:mx-8 mx-0'>
              <Filter handleFilter={handleFilter} />

              {/* 검색창 */}
              <div>
                <form onSubmit={searchSubmit} className='flex items-center'>
                  <input
                    type='text'
                    placeholder='제목, 이름을 입력하세요.'
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
            </nav>
          </div>

          <div className='flex flex-wrap justify-center md:justify-between lg:justify-center'>
            {currentItems.map((e, index) =>
              loading ? (
                <EssayCardSkeleton />
              ) : (
                <EssayCard
                  key={index}
                  id={e.id}
                  title={e.title}
                  content={e.content}
                  thumbnail={e.img_path}
                  like={e.like}
                  nickname={e.nickname}
                  comments={e.comments}
                />
              )
            )}
          </div>

          {/* 글작성 버튼 */}
          <div className='flex justify-center md:justify-end w-full pr-0 sm:pr-8'>
            {window.localStorage.getItem('userID') ? (
              <Link className='m-2' to={`/essay/create`} onClick={handleLogin}>
                <ResButton text='글 작성' width={'120px'} />
              </Link>
            ) : (
              <Link className='m-2' to={`/login`} onClick={handleLogin}>
                <ResButton text='글 작성' />
              </Link>
            )}
          </div>

          {/* 페이지네이션 */}
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={itemsPerPage}
            totalItemsCount={filtered.length}
            pageRangeDisplayed={5} // 보여질 페이지 범위
            onChange={handlePageChange}
            prevPageText={'<'}
            nextPageText={'>'}
            itemClass='page-item'
            linkClass='page-link'
          />
        </div>
      </section>
    </div>
  );
}
