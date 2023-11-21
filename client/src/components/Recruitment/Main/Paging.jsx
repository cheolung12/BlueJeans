import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from 'react-js-pagination';
import workC from '../../../data/workC.json';
import '../../../App.css';
import { Link } from 'react-router-dom';

export default function Paging() {
    // const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10); // 페이지당 아이템 수

    // json 파일데이터(임시)
    const works = workC.works;

    // axios get
    const fetchData = async () => {
        try {
            const response = await axios({
                method: 'GET',
                url: 'http://localhost:8080/api/jobs',
            });
            console.log(response); // 받은 데이터를 상태에 업데이트
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // 데이터 get 버튼
    const handleClick = () => {
        fetchData(); // 데이터 요청 함수 호출
    };

    // 현재 페이지의 데이터 계산
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = works.slice(indexOfFirstItem, indexOfLastItem); // 백엔드 통신시 work => response.data변수

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
            {/* 데이터 요청 버튼 */}
            <button onClick={handleClick}>일자리 불러오기</button>
            <div>
                {/* 데이터 표시 */}
                <div class="flex justify-center flex-wrap">
                    {currentItems.map((currentItem) => (
                        <article class="w-96 h-48 justify-center" key={currentItem.id}>
                            <Link
                                class="flex flex-row justify-center"
                                to={`/recruitment/detail/${currentItem.id}`}
                                state={{ dataDetail: currentItem }}
                            >
                                <div class="bg-slate-400 w-1/2">
                                    <img class="rounded-md border-solid" src="" alt="이미지" />
                                </div>
                                <div class="bg-slate-500 w-2/3">
                                    <h2>{currentItem.title}</h2>
                                    <div>{currentItem.money}</div>
                                    <div>{currentItem.region}</div>
                                    <div>{currentItem.contact}</div>
                                </div>
                            </Link>
                        </article>
                    ))}
                </div>
            </div>
            {/* 페이지네이션 */}
            <Pagination
                activePage={currentPage}
                itemsCountPerPage={itemsPerPage}
                totalItemsCount={works.length}
                pageRangeDisplayed={5} // 보여질 페이지 범위
                onChange={handlePageChange}
                prevPageText={'<'}
                nextPageText={'>'}
                itemClass="page-item"
                linkClass="page-link"
            />
        </div>
    );
}
