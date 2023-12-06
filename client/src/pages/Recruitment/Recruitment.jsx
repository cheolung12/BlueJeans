import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import JobCard from '../../components/Recruitment/Main/JobCard';
import JobCardSkeleton from '../../components/Recruitment/Main/JobCardSkeleton';
import axios from 'axios';
import Pagination from 'react-js-pagination';
import '../../App.css';

export default function Recruitment() {
    const [loading, setLoading] = useState(true);
    const isLogin = localStorage.getItem('isLogin');
    const userRegion = (localStorage.getItem('address') || '').split(' ').slice(0, 2).join(' ');

    // 통신시 데이터(정식)
    const [works, setWorks] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [saveSearch, setSaveSearch] = useState([]);

    // 기본 데이터 조회 ==========================================================
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios({
                    method: 'GET',
                    url: `${process.env.REACT_APP_SERVER}/jobs`,
                });
                console.log(response); // 받은 데이터를 상태에 업데이트
                setWorks(response.data);
                setSaveSearch(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchdata();
    }, []);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10); // 페이지당 아이템 수

    // 옵션별 정렬 ===============================================================
    const [selectValue, setSelectValue] = useState('latest');

    // select 변경
    const handleChange = async (e) => {
        const type = e.target.value;
        setSelectValue(type);

        let endPoint;
        // searchKeyword가 있는 경우
        if (searchInput.length !== 0) {
            endPoint = `?search=${searchInput}`;
            // + 정렬이 있는 경우
            if (type) {
                endPoint = `?search=${searchInput}&sort=${type}`;
            }
        }
        // searchKeyword가 없는 경우
        else {
            if (type) {
                // + 정렬이 있는 경우
                endPoint = `?sort=${type}`;
            }
        }
        console.log(`요청 url: ${process.env.REACT_APP_SERVER}/jobs${endPoint}`);
        const res = await axios({
            method: 'GET',
            url: `${process.env.REACT_APP_SERVER}/jobs${endPoint}`,
        });
        console.log('조회', res.data);
        if (res) {
            setWorks(res.data);
            setSaveSearch(res.data);
            setLoading(false);
            setIsChecked(false);
        }
    };

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

    // 검색어 입력 =======================================================================

    const searchSubmit = async () => {
        const res = await axios({
            method: 'GET',
            url: `${process.env.REACT_APP_SERVER}/jobs?search=${searchInput}&sort=${selectValue}`,
        });
        console.log('조회', res.data);
        if (res.data.length === 0) {
            alert('해당 검색 결과가 없습니다.');
            // 검색 결과가 없습니다.
        } else {
            setWorks(res.data);
            setSaveSearch(res.data);
            setLoading(false);
            setIsChecked(false);
        }
    };

    //집근처 토글
    const handleCheckboxChange = () => {
        const fil = works.filter((work) => work.region.split(' ').slice(0, 2).join(' ') === userRegion);
        setIsChecked((prev) => !prev);
        if (!isChecked) {
            setWorks(fil);
            if (fil.length === 0) {
                alert('집 근처의 공고가 없습니다.');
                setIsChecked((prev) => !prev);
                setWorks(saveSearch);
            }
        } else {
            setWorks(saveSearch);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            searchSubmit();
        }
    };

    return (
        <>
            <div className="pl-0 lg:pl-[196px] w-[94%]">
                <div
                    className="w-[100%] h-72 relative rounded-3xl sm:bg-center bg-top"
                    style={{
                        backgroundImage: 'url("https://bluejeansbucket2.s3.ap-northeast-2.amazonaws.com/user/reBanner.jpg")',
                        backgroundSize: 'cover',
                        // backgroundPosition: '0px sm:-140px 0px',
                        backgroundRepeat: 'no-repeat',
                        boxShadow: ' rgba(0, 0, 0, 0.15) 0px 5px 15px 0px',
                    }}
                >
                    <div
                        className="w-full h-full flex justify-center items-center md:items-start absolute inset-0 overflow-hidden rounded-3xl"
                        style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
                    >
                        <div className="flex flex-col justify-start w-full pl-0 md:pl-6 pt-6">
                            <div className="text-white text-2xl md:text-4xl text-center md:text-start font-bold pb-3 animate__animated animate__fadeInDown">
                                나이는 숫자일 뿐,
                            </div>
                            <div className="text-white text-xl md:text-2xl text-center md:text-start animate__animated animate__fadeInDown">
                                당신의 경력과 노련함을 공유해주세요!
                            </div>
                        </div>
                    </div>
                </div>

                <br />
                <br />

                <div className="w-full flex justify-center">
                    <section className="sm:max-w-[500px] lg:max-w-[900px] xl:max-w-4xl max-w-sm block">
                        <div className="lg:w-[896px] w-full flex lg:flex-row flex-col items-center justify-between px-4">
                            {/* 인기순 & 최신순 셀렉트 */}
                            <nav className="lg:w-full w-[390px] flex lg:justify-normal justify-between items-center flex-row sm:px-3 md:px-1 lg:px-0 px-4">
                                <select
                                    className="m-2 px-4 py-2 border-2 rounded-md focus:border-signatureColor sm:text-base text-sm"
                                    name=""
                                    id=""
                                    value={selectValue}
                                    onChange={handleChange}
                                >
                                    <option value="latest">최신순</option>
                                    <option value="likes">인기순</option>
                                </select>
                                {isLogin ? (
                                    <div className="form-control w-48 mx-2">
                                        <label className="lg:justify-normal justify-end autoSaverSwitch relative inline-flex cursor-pointer select-none items-center">
                                            <input
                                                type="checkbox"
                                                name="autoSaver"
                                                className="sr-only"
                                                checked={isChecked}
                                                onChange={handleCheckboxChange}
                                            />
                                            <span
                                                className={`slider mr-3 flex h-[26px] w-[50px] items-center rounded-full p-1 duration-200 ${
                                                    isChecked ? 'bg-green-600' : 'bg-gray-300'
                                                }`}
                                            >
                                                <span
                                                    className={`dot h-[18px] w-[18px] rounded-full bg-white duration-200 ${
                                                        isChecked ? 'translate-x-6' : ''
                                                    }`}
                                                ></span>
                                            </span>
                                            <span className="label flex items-center sm:text-base text-sm font-medium text-black">
                                                집 근처만 보기
                                            </span>
                                        </label>
                                    </div>
                                ) : (
                                    <div />
                                )}
                            </nav>
                            {/* 일자리 검색창 */}
                            <div className="flex">
                                <div className="flex mr-3 lg:justify-normal justify-center">
                                    <input
                                        type="text"
                                        placeholder="찾고 있는 직무를 입력하세요..."
                                        value={searchInput}
                                        onChange={(e) => setSearchInput(e.target.value)}
                                        className="border-2 rounded-full md:w-[23.5rem] lg:w-[25.5rem] w-[21.5rem] lg:h-[2.7rem] h-[2.4rem] border-gray-300 focus:border-signatureColor outline-none pl-3 sm:text-base text-sm"
                                        onKeyDown={handleKeyDown}
                                    />
                                    <button
                                        onClick={searchSubmit}
                                        disabled={searchInput.length === 0}
                                        className="ml-[-2.5rem] mt-1 w-[2rem] h-[2rem] flex items-center justify-center cursor-pointer"
                                    >
                                        {/* 검색 아이콘 */}
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none">
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

                        <br />

                        {/* 메인 */}
                        <div>
                            {loading ? (
                                <JobCardSkeleton />
                            ) : (
                                // 데이터 로드가 완료되면 실제 컴포넌트에 props로 데이터 전달
                                <JobCard dataList={currentItems} />
                            )}
                        </div>

                        {/* 페이지 네이션 & 게시 버튼 */}
                        <nav>
                            <div className="mr-3 mt-3 flex justify-end">
                                <Link className="hover:opacity-95" to={`/recruitment/create`}>
                                    <div className="sm:w-[6rem] w-[5rem] sm:h-[3rem] h-[2rem] sm:text-lg text-sm inline-flex items-center justify-center px-2 py-2 text-white bg-signatureColor rounded-lg shadow-sm font-semibold cursor-pointer">
                                        공고 게시
                                    </div>
                                </Link>
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
                        </nav>
                    </section>
                </div>
            </div>
        </>
    );
}
