import React from 'react';
import { Link, useParams } from 'react-router-dom';
import essay from '../../data/essay.json';
import EssayCard from '../../components/Essay/Main/EssayCard';
import ResButton from '../../components/common/ResButton';
import Pagination from 'react-js-pagination';
import { useState } from 'react';
import SideNavBar from '../../components/common/SideNavBar';

// 백일장 임시데이터
const essays = essay.essays;

export default function Essay() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // 페이지당 아이템 수

  // 현재 페이지의 데이터 계산
  //   const indexOfLastItem = currentPage * itemsPerPage;
  //   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  //   const currentItems = essays.slice(indexOfFirstItem, indexOfLastItem); // 백엔드 통신시 work => response.data변수

  // 페이지 변경 처리
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    scrollToTop(); // 페이지 변경 후 페이지 상단으로 스크롤
  };

  // 페이지 상단으로 스크롤하는 함수
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className='w-full'>
      <section className='flex flex-col'>
        {/* 인기순 & 최신순 셀렉트 */}
        <div className='flex justify-center'>
          <nav className='flex justify-end w-[48rem]'>
            <Link className='m-2' to={`/essay/create`}>
              <ResButton text='글 작성' />
            </Link>
            <select
              className='m-2 px-4 py-2 border-2 rounded-md focus:border-chatColor'
              name=''
              id=''
              // value={selectValue}
              // onChange={handleChange}
            >
              <option value='latest'>최신순</option>
              <option value='favorite'>인기순</option>
            </select>
          </nav>
        </div>

        <div className='flex justify-center'>
          <div className='flex flex-wrap justify-center w-[48rem]'>
            {essays.map((essayItem) => (
              <EssayCard
                key={essayItem.id}
                id={essayItem.id}
                title={essayItem.title}
                content={essayItem.content}
                thumbnail={essayItem.thumbnail}
              />
            ))}
          </div>
          {/* 페이지 네이션 & 게시 버튼 */}
          <nav>
            {/* 페이지네이션 */}
            {/* <Pagination
              activePage={currentPage}
              itemsCountPerPage={itemsPerPage}
              totalItemsCount={essays.length}
              pageRangeDisplayed={5} // 보여질 페이지 범위
              onChange={handlePageChange}
              prevPageText={'<'}
              nextPageText={'>'}
              itemClass='page-item'
              linkClass='page-link'
            /> */}
          </nav>
        </div>
      </section>
    </div>
  );
}
