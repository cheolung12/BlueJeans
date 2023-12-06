import React, { useState, useEffect } from 'react';
import ImgSection from '../../components/Recruitment/Detail/ImgSection';
import ExplainSection from '../../components/Recruitment/Detail/ExplainSection';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { IoMdHeartEmpty } from 'react-icons/io';
import { IoMdHeart } from 'react-icons/io';

export default function RecruitmentDetail() {
    const navigate = useNavigate();
    const { jobId } = useParams();

    const [loading, setLoading] = useState(true);
    const [works, setWorks] = useState([]);
    const [isCloseR, setIsCloseR] = useState();
    const [isHeart, setIsHeart] = useState();
    const [allHeart, setAllIsHeart] = useState();

    // 상세 페이지 조회
    useEffect(() => {
        const fetchdata = async () => {
            if(!localStorage.getItem('isLogin')){
                alert("로그인이 필요합니다.")
                navigate('/login');
            }
            try {
                const response = await axios({
                    method: 'GET',
                    url: `${process.env.REACT_APP_SERVER}/jobs/${jobId}`,
                    withCredentials: true,
                });
                console.log(response); // 받은 데이터를 상태에 업데이트
                setWorks(response.data);
                setIsCloseR(response.data.recruiting);
                setIsHeart(response.data.heart);
                setAllIsHeart(response.data.like);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchdata();
    }, [jobId]);

    console.log('유저닉네임 : ', localStorage.getItem('nickname')); // 로그인된 유저의 닉네임
    console.log('작성닉네임 : ', works.nickname);

    // 공고 삭제
    const deleteRecruit = async () => {
        console.log('공고 삭제');
        if (window.confirm('공고를 삭제하시겠습니까?')) {
            try {
                const response = await axios({
                    method: 'DELETE',
                    url: `${process.env.REACT_APP_SERVER}/jobs/${works.id}`,
                    withCredentials: true,
                });
                console.log(response);
                navigate('/recruitment');
                alert('공고 삭제가 완료되었습니다.');
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        } else {
        }
        console.log(works.id);
    };

    //좋아요 버튼
    const onClickHeart = async () => {
        try {
            const response = await axios({
                method: 'POST',
                url: `${process.env.REACT_APP_SERVER}/jobs/like/${jobId}`,
                withCredentials: true,
            });
            console.log(response.data);
            setIsHeart((prev) => !prev);
            if (isHeart === true) {
                setAllIsHeart((prev) => prev - 1);
            } else if (isHeart === false) {
                setAllIsHeart((prev) => prev + 1);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const recruitClose = async () => {
        try {
            const response = await axios({
                method: 'POST',
                url: `${process.env.REACT_APP_SERVER}/jobs/recruiting/${works.id}`,
                withCredentials: true,
            });
            console.log('마감 통신', response);
            setIsCloseR((prevIsClose) => !prevIsClose);
            console.log('버튼 속 마감 콘솔', isCloseR);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    console.log('상세보냄', works);

    return (
        <>
            <div className="max-w-4xl w-full flex justify-center">
                <section className=" block">
                    <section className="flex flex-col justify-center">
                        <div className="w-full">
                            <ImgSection loading={loading} data={works} />
                            <div className="mx-3 my-2">{works.nickname} 님의 공고입니다.</div>{' '}
                            <div className="mx-3 my-2 flex sm:flex-row flex-col sm:justify-between sm:items-center items-start">
                                <div className="text-justify flex sm:flex-row flex-col">
                                    {isCloseR ? (
                                        <p className="w-[3rem] h-[2rem] mr-2 mb-2 inline-flex items-center justify-center px-2 py-2 text-white bg-green-600 rounded-lg shadow-sm font-semibold">
                                            모집
                                        </p>
                                    ) : (
                                        <p className="w-[3rem] h-[2rem] mr-2 mb-2 inline-flex items-center justify-center px-2 py-2 text-white bg-red-600 rounded-lg shadow-sm font-semibold">
                                            마감
                                        </p>
                                    )}
                                    <p className="sm:text-2xl text-lg mb-2 font-bold">{works.title}</p>
                                </div>
                                <div>
                                    {isHeart ? (
                                        <div className="flex flex-row items-center cursor-pointer" onClick={onClickHeart}>
                                            <IoMdHeart className="mr-2 text-4xl text-red-600" />
                                            {allHeart}개
                                        </div>
                                    ) : (
                                        <div className="flex flex-row items-center cursor-pointer" onClick={onClickHeart}>
                                            <IoMdHeartEmpty className="mr-2 text-4xl text-gray-700" />
                                            {allHeart}개
                                        </div>
                                    )}
                                </div>
                            </div>
                            <ExplainSection loading={loading} data={works} />
                        </div>
                    </section>
                    <nav className="pr-2 w-full flex justify-end">
                        {localStorage.getItem('nickname') === works.nickname ? (
                            <div className="flex flex-row  space-x-2">
                                <div
                                    className="sm:w-[6rem] w-[5rem] sm:h-[3rem] h-[2rem] sm:text-lg text-sm inline-flex items-center justify-center px-2 py-2 text-white  bg-signatureColor rounded-lg shadow-sm font-semibold cursor-pointer"
                                    onClick={recruitClose}
                                >
                                    {isCloseR ? '마감 하기' : '다시 모집'}
                                </div>
                                <Link to={`/recruitment/edit/${works.id}`} state={{ dataDetail: works }} key={works.id}>
                                    <div className="sm:w-[4rem] w-[3rem] sm:h-[3rem] h-[2rem] sm:text-lg text-sm inline-flex items-center justify-center px-2 py-2 text-white bg-signatureColor rounded-lg shadow-sm font-semibold cursor-pointer">
                                        수정
                                    </div>
                                </Link>
                                <button
                                    className="sm:w-[4rem] w-[3rem] sm:h-[3rem] h-[2rem] sm:text-lg text-sm inline-flex items-center justify-center px-2 py-2 text-white bg-signatureColor rounded-lg shadow-sm font-semibold cursor-pointer"
                                    onClick={deleteRecruit}
                                >
                                    삭제
                                </button>
                                <Link to={`/recruitment`}>
                                    <div className="sm:w-[4rem] w-[3rem] sm:h-[3rem] h-[2rem] sm:text-lg text-sm inline-flex items-center justify-center px-2 py-2 text-white bg-signatureColor rounded-lg shadow-sm font-semibold cursor-pointer">
                                        목록
                                    </div>
                                </Link>
                            </div>
                        ) : (
                            <Link to={`/recruitment`}>
                                <div className="sm:w-[4rem] w-[3rem] sm:h-[3rem] h-[2rem] sm:text-lg text-sm inline-flex items-center justify-center px-2 py-2 text-white bg-signatureColor rounded-lg shadow-sm font-semibold cursor-pointer">
                                    목록
                                </div>
                            </Link>
                        )}
                    </nav>
                </section>
            </div>
        </>
    );
}
