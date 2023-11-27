import React, { useState, useEffect } from 'react';
import DetailExample from '../../components/Recruitment/Detail/DetailExample';
import { Link, useLocation } from 'react-router-dom';
import ResButton from '../../components/common/ResButton';
import axios from 'axios';

export default function RecruitmentDetail({}) {
    const location = useLocation();
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
                    url: `http://localhost:8080/api/recruiting/{job_id}`,
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
        try {
            const response = await axios({
                method: 'DELETE',
                url: `http://localhost:8080/api/location.state.dataDetail.id`,
                // url: `http://localhost:8080/api/jobs/{job_id)`,
            });
            console.log(response);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <>
            <div className="w-full flex justify-center">
                <section className="max-w-4xl block">
                    <DetailExample data={location} />
                    <nav className="flex justify-end">
                        {editA ? (
                            <div className="flex flex-row  space-x-2">
                                <button onClick={recruitClick}>{recruitingButton}</button>
                                <button onClick={editRecruit}>수정</button>
                                <button onClick={deleteRecruit}>삭제</button>
                                <Link to={`/recruitment`}>
                                    <ResButton text="목록" />
                                </Link>
                            </div>
                        ) : (
                            <Link to={`/recruitment`}>
                                <ResButton text="목록" />
                            </Link>
                        )}
                    </nav>
                </section>
            </div>
        </>
    );
}
