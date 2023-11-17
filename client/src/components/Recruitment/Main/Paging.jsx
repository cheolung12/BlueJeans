import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from 'react-js-pagination';
import workC from '../../../data/workC.json';
import '../../../App.css';

export default function Paging() {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10); // 페이지당 아이템 수

    // json 파일데이터(임시)
    const works = workC.works;

    // axios get
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/데이터요청api'); // 해당 엔드포인트에 GET 요청
                setData(response.data); // 받은 데이터를 상태에 업데이트
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

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
            <div>
                {/* 데이터 표시 */}
                <div class="flex justify-center flex-wrap">
                    {currentItems.map((currentItem) => (
                        <article class="w-96 h-48 justify-center" key={currentItem.id}>
                            <div class="flex justify-center">
                                <a class="flex flex-row" href="">
                                    <div class="bg-slate-400 w-1/2">
                                        <img class="rounded-md border-solid" src="" alt="이미지" />
                                    </div>
                                    <div class="bg-slate-500 w-2/3">
                                        <h2>{currentItem.title}</h2>
                                        <div>{currentItem.money}</div>
                                        <div>{currentItem.region}</div>
                                        <div>{currentItem.contact}</div>
                                    </div>
                                </a>
                            </div>
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
