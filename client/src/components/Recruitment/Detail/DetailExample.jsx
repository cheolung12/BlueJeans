import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faClock } from '@fortawesome/free-regular-svg-icons';
import { FaWonSign } from 'react-icons/fa6';
import { FaMapMarkerAlt } from 'react-icons/fa';
import '@fortawesome/fontawesome-free/js/all.js';
import ResButton from '../../common/ResButton';
import Modal from 'react-modal';
import RecruitLikeButton from './RecruitLikeButton';
import { useEffect } from 'react';

export default function DetailExample({ data }) {
    const dataD = data.state.dataDetail;

    const workdDayfrom = data.state.dataDetail.workDay;

    // const workDay = workdDayfrom
    //     .split(',')
    //     .sort((a, b) => {
    //         const sortWeek = ['일', '월', '화', '수', '목', '금', '토']; //sort용 배열
    //         return sortWeek.indexOf(a) - sortWeek.indexOf(b);
    //     })
    //     .join(',');

    const sampleimg = '/images/s1.jpeg';

    const [isOpen, setIsOpen] = useState(false);
    // Modal 스타일
    const customStyles = {
        overlay: {
            backgroundColor: 'rgba(0,0,0,0.5)',
        },
        content: {
            left: '0',
            margin: 'auto',
            width: '250px',
            height: '150px',
            padding: '0',
            overflow: 'hidden',
        },
    };

    const modalToggle = () => {
        setIsOpen(!isOpen);
    };

    const [isRe, setIsRe] = useState(dataD.recruiting);
    const [isRecruiting, setIsRecruiting] = useState('');

    useEffect(() => {
        if (isRe == true) {
            setIsRecruiting('모집');
        } else if (isRe == false) {
            setIsRecruiting('마감');
        }
    }, [isRe]);

    // if (isRe == true) {
    //     setIsRecruiting('모집');
    // } else if (isRe == false) {
    //     setIsRecruiting('마감');
    // }
    const Rclose = () => {
        if (isRe == true) {
            setIsRe(false);
        } else if (isRe == false) {
            setIsRe(true);
        }
    };

    console.log(dataD);
    console.log(isRe);
    console.log('마감여부 :', isRecruiting);

    // 공고 게시일 ===========================================================
    const dateString = dataD.createdAt;

    // 주어진 문자열에서 날짜 부분만 추출
    const extractedDate = dateString.split('T')[0];

    // 추출된 날짜를 Date 객체로 변환
    const givenDate = new Date(extractedDate);

    // 현재 날짜
    const currentDate = new Date();

    // 일수 차이 계산 (밀리초 단위로 차이 계산 후 일 수로 변환)
    const timeDifference = currentDate.getTime() - givenDate.getTime();
    const daysDifference = timeDifference / (1000 * 3600 * 24);

    const differenceInDays = Math.floor(daysDifference);
    console.log('일수 차이 변수에 담기: ' + differenceInDays + '일');

    return (
        <>
            <section className="flex flex-col justify-center">
                <div className="w-[750px]">
                    {/* <div>=={dataD.id}번 일자리==</div>*/}
                    <div className="w-full h-[450px] overflow-hidden border border-solid rounded-lg flex items-center justify-center">
                        <img className="w-full h-auto " src={sampleimg} alt="직업 소개 이미지" />
                    </div>
                    <div className="m-2">글쓴이 프로필</div>
                    <div className="m-2  flex justify-between items-center">
                        <div className="text-justify flex">
                            <p className="w-[3rem] h-[2rem] mr-2 inline-flex items-center justify-center px-2 py-2 text-white bg-green-600 rounded-lg shadow-sm font-semibold cursor-pointer">
                                {isRecruiting}
                            </p>
                            <p className="text-2xl font-bold">{dataD.title}</p>
                        </div>
                        <div onClick={Rclose}>마감버튼ㅋㅋ</div>
                        {/* 찜하기 버튼 */}
                        <RecruitLikeButton like="좋아요" notlike="해제" /> {/*  allLike={dataD.like}  */}
                        <div className="flex">
                            {/* true => dataD.recruiting */}
                            {true ? (
                                <div>
                                    {/* 공고 지원 버튼 */}
                                    <button className="bg-signatureColor text-white p-2 rounded-md hover:bg-opacity-80" onClick={modalToggle}>
                                        공고 지원하기
                                    </button>
                                    {/* 지원 시 연락처 모달 생성 */}
                                    <Modal isOpen={isOpen} ariaHideApp={false} style={customStyles}>
                                        <div>연락처 - {dataD.contact}</div>
                                        <div className="flex justify-end pr-4">
                                            <button className="bg-signatureColor text-white p-2 rounded-md hover:bg-opacity-80" onClick={modalToggle}>
                                                닫기
                                            </button>
                                        </div>
                                    </Modal>
                                </div>
                            ) : (
                                <ResButton text={'마감'} />
                            )}
                        </div>
                    </div>
                    <div className="m-2 text-gray-600">{differenceInDays}일 전 작성</div>
                    <hr />
                    <div className="m-2 flex flex-col space-y-4">
                        <div className="text-xl font-semibold">정보</div>
                        <div className="text-lg flex items-center">
                            <FaWonSign className="mr-2" />
                            급여 - {dataD.money}원
                        </div>
                        <div className="text-lg flex items-center">
                            <FaMapMarkerAlt className="mr-2" />
                            지역 - {dataD.region}
                        </div>
                        <div className="text-lg">
                            <FontAwesomeIcon icon={faCalendarDays} className="mr-2" />
                            근무 요일 - {dataD.workDay} {/* {dataD.workDay} */}
                        </div>
                        <div className="text-lg">
                            <FontAwesomeIcon icon={faClock} className="mr-2" />
                            근무 시간 - {dataD.workTime} {/* {dataD.workTime} */}
                        </div>
                    </div>
                    <hr />
                    <div className="m-2 flex flex-col space-y-4">
                        <div className="text-xl font-semibold">직무 상세 설명</div>
                        <div className="text-lg">
                            {/*내용설명-*/}
                            {dataD.content}
                        </div>
                    </div>
                </div>
            </section>

            {/* {title} {money} {region} {contact} {content} {workDay} {workTime} */}
        </>
    );
}
