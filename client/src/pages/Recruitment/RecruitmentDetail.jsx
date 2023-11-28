import React, { useState, useEffect } from 'react';
import DetailExample from '../../components/Recruitment/Detail/DetailExample';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ResButton from '../../components/common/ResButton';
import axios from 'axios';

export default function RecruitmentDetail() {
    const navigate = useNavigate();
    const location = useLocation();
    console.log(localStorage.getItem('nickname'));
    console.log(location.state.dataDetail);

    // 권한 여부
    // 게시물 등록자와 현재 로그인된 유저가 같을 시에 => boolean => 마감 수정 삭제 버튼 활성화
    // 게시물 등록자 - data.userId.userID
    // 로그인된 유저 - ?
    const [editA, setEditA] = useState(true);
    // if ('권한있으면') {
    //     setEditA(true);
    // } else if ('권한없으면') {
    //     setEditA(false);
    // }

    // 유저 정보 불러오기
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios({
    //                 method: 'GET',
    //                 url: `http://localhost:8080/api/`,
    //             });
    //             console.log(response);
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         }
    //     };
    //     fetchData();
    // }, []);

    // 마감 하기
    const [recruitingButton, setRecruitingButton] = useState('마감 하기');
    const [recruitChange, setRecruitChange] = useState(true); //recruiting값

    // 마감 버튼
    function recruitClick() {
        // if (location.state.dataDetail.recruitng) {
        if (recruitingButton === '마감 하기' && recruitChange) {
            setRecruitingButton('다시 모집');
            setRecruitChange(false);
        } else if (recruitingButton === '다시 모집' && !recruitChange) {
            setRecruitingButton('마감 하기');
            setRecruitChange(true);
        }
        console.log(recruitingButton, recruitChange);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios({
                    method: 'POST',
                    url: `${process.env.REACT_APP_SERVER}/recruiting/{job_id}`,
                });
                console.log(response);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [recruitChange]);

    // 공고 수정
    function editRecruit() {
        console.log('공고 수정');
    }

    // 공고 삭제
    const deleteRecruit = async () => {
        console.log('공고 삭제');
        if (window.confirm('공고를 삭제하시겠습니까?')) {
            try {
                const response = await axios({
                    method: 'DELETE',
                    url: `${process.env.REACT_APP_SERVER}/jobs/${location.state.dataDetail.id}`,
                });
                console.log(response);
                navigate('/recruitment');
                alert('공고 삭제가 완료되었습니다.');
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        } else {
            // 취소 버튼을 눌렀을 때 실행되는 코드
            // Optional: 원하는 작업을 수행하지 않을 때의 처리
        }
        try {
            const response = await axios({
                method: 'DELETE',
                url: `${process.env.REACT_APP_SERVER}/jobs/${location.state.dataDetail.id}`,
            });
            console.log(response);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        console.log(location.state.dataDetail.id);
    };

    return (
        <>
            <div className="w-full flex justify-center">
                <section className="max-w-4xl block">
                    <DetailExample data={location} />
                    <nav className="flex justify-end">
                        {editA ? (
                            <div className="flex flex-row  space-x-2">
                                <button
                                    className="w-[6rem] h-[3rem] inline-flex items-center justify-center px-2 py-2 text-white bg-signatureColor rounded-lg shadow-sm font-semibold cursor-pointer"
                                    onClick={recruitClick}
                                >
                                    {recruitingButton}
                                </button>
                                <Link
                                    to={`/recruitment/edit/${location.state.dataDetail.id}`}
                                    state={{ dataDetail: location.state.dataDetail }}
                                    key={location.state.dataDetail.id}
                                >
                                    <div className="w-[4rem] h-[3rem] inline-flex items-center justify-center px-2 py-2 text-white bg-signatureColor rounded-lg shadow-sm font-semibold cursor-pointer">
                                        수정
                                    </div>
                                </Link>
                                <button
                                    className="w-[4rem] h-[3rem] inline-flex items-center justify-center px-2 py-2 text-white bg-signatureColor rounded-lg shadow-sm font-semibold cursor-pointer"
                                    onClick={deleteRecruit}
                                >
                                    삭제
                                </button>
                                <Link to={`/recruitment`}>
                                    <div className="w-[4rem] h-[3rem] inline-flex items-center justify-center px-2 py-2 text-white bg-signatureColor rounded-lg shadow-sm font-semibold cursor-pointer">
                                        목록
                                    </div>
                                </Link>
                            </div>
                        ) : (
                            <Link to={`/recruitment`}>
                                <div className="w-[4rem] h-[3rem] inline-flex items-center justify-center px-2 py-2 text-white bg-signatureColor rounded-lg shadow-sm font-semibold cursor-pointer">
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
