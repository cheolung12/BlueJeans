import React, { useState, useEffect } from 'react';
// import SelectRecruit from '../../components/Recruitment/Main/SelectRecruit';
import { Link } from 'react-router-dom';
import ResButton from '../../components/common/ResButton';
import JobCard from '../../components/Recruitment/Main/JobCard';
// import SearchRecruit from '../../components/Recruitment/Main/SearchRecruit';
import workC from '../../data/workC.json';
import axios from 'axios';
import Pagination from 'react-js-pagination';
import '../../App.css';
import SideNavBar from '../../components/common/SideNavBar';

export default function Recruitment() {
    // json 파일데이터(임시)
    const works = workC.works;
    // 통신시 데이터(정식)
    // const [works, setWorks] = useState([]);

    // 기본 데이터 조회 ==========================================================
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios({
                    method: 'GET',
                    url: `${process.env.REACT_APP_SERVER}/jobs`,
                });
                console.log(response); // 받은 데이터를 상태에 업데이트
                // setWorks(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchdata();
    }, []);

    console.log(works);

    // const [data, setData] = useState([]); // fetch data
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10); // 페이지당 아이템 수

    // 옵션별 정렬 ===============================================================
    const [selectValue, setSelectValue] = useState('latest');

    const handleChange = async (e) => {
        const type = e.target.value;
        setSelectValue(type);

        // 전역으로 선언
        let res, query;
        if (type !== 'region') {
            query = `filter?order=${type}`;
        } else {
            query = 'searchRegion?region=지역명';
        }
        try {
            res = await axios({
                method: 'GET',
                url: `${process.env.REACT_APP_SERVER}/jobs/${query}`,
            });
        } catch (error) {
            console.log('axios 오류: ', error);
        }
        if (res) {
            console.log(res);
            // setWorks(res.data);
        }
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

    // 검색어 입력 =======================================================================
    const [searchInput, setSearchInput] = useState('');

    const searchSubmit = async () => {
        console.log('검색어:', searchInput);
        try {
            const response = await axios({
                method: 'GET',
                url: `${process.env.REACT_APP_SERVER}/jobs/searchKeyword?keyword=${searchInput}`,
            });
            console.log(response); // 받은 데이터를 상태에 업데이트
            // setWorks(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <>
            <div className="w-full flex justify-center">
                <section className="lg:max-w-4xl max-w-lg block">
                    {/* 데이터 요청 버튼 
                <button onClick={handleClick}>일자리 불러오기</button> */}
                    <div className="lg:w-[896px] w-[400px] flex lg:flex-row flex-col items-center justify-between px-4">
                        {/* 인기순 & 최신순 셀렉트 */}
                        <nav className="flex justify-end items-center">
                            <Link className="m-2" to={`/recruitment/create`}>
                                <ResButton text="공고 게시" />
                            </Link>
                            <select
                                className="m-2 px-4 py-2 border-2 rounded-md focus:border-chatColor"
                                name=""
                                id=""
                                value={selectValue}
                                onChange={handleChange}
                            >
                                <option value="latest">최신순</option>
                                <option value="favorite">인기순</option>
                                <option value="region">거리순</option>
                            </select>
                        </nav>
                        {/* 일자리 검색창 */}
                        <div className="flex">
                            <div className="flex mr-3">
                                <input
                                    type="text"
                                    placeholder="찾고 있는 직무를 입력하세요"
                                    value={searchInput}
                                    onChange={(e) => setSearchInput(e.target.value)}
                                    className="border rounded-full w-[15rem] h-[2.2rem] border-gray-300 outline-none pl-3 text-sm"
                                />
                                <button
                                    onClick={searchSubmit}
                                    disabled={searchInput.length === 0}
                                    className="ml-[-2.5rem] w-[2rem] h-[2rem] flex items-center justify-center cursor-pointer"
                                >
                                    {/* 검색 아이콘 */}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M15.1991 6.74703C12.865 4.4131 9.08077 4.4131 6.74668 6.74703C4.41256 9.08098 4.41256 12.8651 6.74668 15.199C8.90131 17.3535 12.2917 17.5192 14.6364 15.696L17.9384 18.9978L18.999 17.9371L15.6969 14.6353C17.5194 12.2908 17.3535 8.90121 15.1991 6.74703ZM7.8073 7.80772C9.55561 6.05953 12.3902 6.05953 14.1385 7.80772C15.8868 9.55588 15.8868 12.3902 14.1385 14.1383C12.3902 15.8865 9.55561 15.8865 7.8073 14.1383C6.05902 12.3902 6.05902 9.55588 7.8073 7.80772Z"
                                            fill="#222222"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* 메인 */}
                    <JobCard dataList={currentItems} />

                    {/* 페이지 네이션 & 게시 버튼 */}
                    <nav>
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
                    </nav>
                </section>
            </div>
        </>
    );
}
