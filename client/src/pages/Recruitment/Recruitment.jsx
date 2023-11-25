import React, { useState, useEffect } from 'react';
// import SelectRecruit from '../../components/Recruitment/Main/SelectRecruit';
import { Link } from 'react-router-dom';
import ResButton from '../../components/common/ResButton';
import JobCard from '../../components/Recruitment/Main/JobCard';
import workC from '../../data/workC.json';
import axios from 'axios';
import Pagination from 'react-js-pagination';
import '../../App.css';
import SideNavBar from '../../components/common/SideNavBar';

export default function Recruitment() {
    // json 파일데이터(임시)
    const works = workC.works;

    // const [data, setData] = useState([]); // fetch data
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10); // 페이지당 아이템 수

    /////////////////////////////////////////////////////////////////////////////////////////////
    // 옵션별 정렬
    const [selectValue, setSelectValue] = useState('latest');
    const [reqStr, setReqStr] = useState('');

    const handleChange = async (e) => {
        setSelectValue(e.target.value);

        // 전역으로 선언
        let res, query;
        if (e.target.value !== 'region') {
            query = `filter?order=${e.target.value}`;
        } else {
            query = 'searchRegion?region=지역명';
        }
        try {
            res = await axios({
                method: 'GET',
                url: `http://localhost:8080/api/jobs/${query}`,
            });
        } catch (error) {
            console.log('axios 오류: ', error);
        }
        if (res) {
            console.log(res);
            // setJobList(받은데이터)
        }
    };

    // const handleChange = (e) => {
    //     setSelectValue(e.target.value);

    //     switch (selectValue) {
    //         case 'latest':
    //             setReqStr('filter?order=latest');
    //             break;
    //         case 'favorite':
    //             setReqStr('filter?order=favorite');
    //             break;
    //         case 'region':
    //             setReqStr('searchRegion?region=지역명');
    //             break;
    //         default:
    //             console.log('변경 사항ㄴ');
    //     }
    // };

    // useEffect(() => {
    //     console.log(reqStr);
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios({
    //                 method: 'GET',
    //                 url: `http://localhost:8080/api/jobs/${reqStr}`,
    //             });
    //             console.log(response);
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         }
    //     };
    //     fetchData();
    // }, [reqStr]);
    /////////////////////////////////////////////////////////////////////////////////////////

    // 현재 페이지의 데이터 계산
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = works.slice(indexOfFirstItem, indexOfLastItem); // 백엔드 통신시 work => response.data변수

    // axios get
    // const fetchData = async () => {
    //     try {
    //         const response = await axios({
    //             method: 'GET',
    //             url: 'http://localhost:8080/api/jobs',
    //         });
    //         console.log(response); // 받은 데이터를 상태에 업데이트
    //     } catch (error) {
    //         console.error('Error fetching data:', error);
    //     }
    // };

    // 데이터 get 버튼
    // const handleClick = () => {
    //     fetchData(); // 데이터 요청 함수 호출
    // };

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
        <>
            <SideNavBar />

            <div className="w-full flex justify-center relative">
                <section className="max-w-4xl block">
                    {/* 데이터 요청 버튼 
                <button onClick={handleClick}>일자리 불러오기</button> */}

                    {/* 인기순 & 최신순 셀렉트 */}
                    <nav className="flex justify-end">
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
