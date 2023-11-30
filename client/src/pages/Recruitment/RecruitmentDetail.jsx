import React, { useState, useEffect } from 'react';
import DetailExample from '../../components/Recruitment/Detail/DetailExample';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import ResButton from '../../components/common/ResButton';
import axios from 'axios';

export default function RecruitmentDetail() {
    const navigate = useNavigate();
    const { jobId } = useParams();

    console.log('잡아이디', jobId);

    // const location = useLocation();
    const [loading, setLoading] = useState(true);
    const [works, setWorks] = useState([]);
    const [isCloseR, setIsCloseR] = useState();
    const [isHeart, setIsHeart] = useState();
    const [allHeart, setAllIsHeart] = useState();

    // 상세 페이지 조회
    useEffect(() => {
        const fetchdata = async () => {
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
                // console.log('마감 토글 :', isCloseR);
                // console.log('내 좋아요 :', isHeart);
                // console.log('총 좋아요 :', allHeart);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchdata();
    }, []);

    // const [isRecruiting, setIsRecruiting] = useState(location.state.dataDetail.recruiting);
    console.log('유저닉네임 : ', localStorage.getItem('nickname')); // 로그인된 유저의 닉네임
    console.log('작성닉네임 : ', works.nickname);
    // console.log(location.state.dataDetail);

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
            // 취소 버튼을 눌렀을 때 실행되는 코드
            // Optional: 원하는 작업을 수행하지 않을 때의 처리
        }
        // try {
        //     const response = await axios({
        //         method: 'DELETE',
        //         url: `${process.env.REACT_APP_SERVER}/jobs/${works.id}`,
        //     });
        //     console.log(response);
        // } catch (error) {
        //     console.error('Error fetching data:', error);
        // }
        console.log(works.id);
    };

    /////띱 ===============
    // const onChangeDIB = async () => {
    //     try {
    //         const response = await axios({
    //             method: 'POST',
    //             url: `${process.env.REACT_APP_SERVER}/jobs/like/${works.id}`, ///${location.state.dataDetail.id}
    //             withCredentials: true,
    //         });
    //         console.log(response);
    //     } catch (error) {
    //         console.error('Error fetching data:', error);
    //     }
    // };

    // 공고 마감 하기 ==================
    // 마감 버튼

    const recruitClose = async () => {
        try {
            const response = await axios({
                method: 'POST',
                url: `${process.env.REACT_APP_SERVER}/jobs/recruiting/${works.id}`, ///${location.state.dataDetail.id}
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
            <div className="w-full flex justify-center">
                <section className="max-w-4xl block">
                    <DetailExample data={works} isCloseR={isCloseR} loading={loading} isHeart={isHeart} allHeart={allHeart} />

                    <nav className="flex justify-end">
                        {localStorage.getItem('nickname') == works.nickname ? (
                            <div className="flex flex-row  space-x-2">
                                {/** 
                                <div className="w-[6rem] h-[3rem] border border-gray-600">
                                    <div onClick={onChangeDIB}>좋아요~</div>
                                </div>
                                */}
                                <div
                                    className="w-[6rem] h-[3rem] inline-flex items-center justify-center px-2 py-2 text-white bg-signatureColor rounded-lg shadow-sm font-semibold cursor-pointer"
                                    onClick={recruitClose}
                                >
                                    {isCloseR ? '마감 하기' : '다시 모집'}
                                </div>
                                <Link to={`/recruitment/edit/${works.id}`} state={{ dataDetail: works }} key={works.id}>
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
