import React, { useState } from 'react';
import Pagination from 'react-js-pagination';
import workC from '../../../data/workC.json';

export default function Paging() {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10); // 페이지당 아이템 수
    const works = workC.works;

    // 현재 페이지의 데이터 계산
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = works.slice(indexOfFirstItem, indexOfLastItem);

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
        <div>
            {/* 데이터 표시 */}
            <div>
                {currentItems.map((currentItems) => (
                    <article className="w-96 h-48 justify-items-center justify-center">
                        <a className="flex flex-row" href="">
                            <div className="bg-slate-400 basis-1/2">
                                <img className="rounded-md border-solid" src="" alt="이미지" />
                            </div>
                            <div className="bg-slate-500 basis-2/3 ">
                                <h2>{currentItems.title}</h2>
                                <div>{currentItems.money}</div>
                                <div>{currentItems.region}</div>
                                <div>{currentItems.contact}</div>
                            </div>
                        </a>
                    </article>
                ))}
            </div>

            {/* 페이지네이션 */}
            <Pagination
                activePage={currentPage}
                itemsCountPerPage={itemsPerPage}
                totalItemsCount={works.length}
                pageRangeDisplayed={5} // 보여질 페이지 범위
                onChange={handlePageChange}
                itemClass="page-item"
                linkClass="page-link"
            />
        </div>
    );
}
