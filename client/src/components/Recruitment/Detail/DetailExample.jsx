import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWonSign, faMapLocationDot, faCalendarDays, faClock } from '@fortawesome/free-regular-svg-icons';
import '@fortawesome/fontawesome-free/js/all.js';
import ResButton from '../../common/ResButton';
import Modal from 'react-modal';

export default function DetailExample({ data }) {
    const dataD = data.state.dataDetail;

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
            width: '500px',
            height: '300px',
            padding: '0',
            overflow: 'hidden',
        },
    };

    const modalToggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <section className="flex flex-col justify-center">
                <div className="w-[750px]">
                    <div>=={dataD.id}번 일자리==</div>
                    <div className="w-full h-[450px] overflow-hidden border border-solid rounded-lg flex items-center justify-center">
                        <img className="w-full h-auto " src={sampleimg} alt="직업 소개 이미지" />
                    </div>
                    <div className="m-2">글쓴이 프로필</div>
                    <div className="m-2  flex justify-between">
                        <div className="text-justify flex">
                            <p className="text-2xl font-bold ">제목-{dataD.title}</p>
                        </div>
                        <div className="flex">
                            {/* true => dataD.recruiting */}
                            {true ? (
                                <div>
                                    <button className="bg-gray-400 p-2 rounded-md hover:bg-opacity-80" onClick={modalToggle}>
                                        공고 지원하기
                                    </button>
                                    {/* 지원 시 연락처 모달 생성 */}
                                    <Modal isOpen={isOpen} ariaHideApp={false} style={customStyles}>
                                        <div>연락처 - {dataD.contact}</div>
                                        <div className="flex justify-end pr-4">
                                            <button className="bg-gray-400 p-2 rounded-md hover:bg-opacity-80" onClick={modalToggle}>
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
                    <div className="m-2 text-gray-600">공고게시일 ex.7일전 or 년월일 - dataD.createdAt가공</div>
                    <hr />
                    <div className="m-2 flex flex-col space-y-4">
                        <div className="text-xl font-semibold">정보</div>
                        <div className="text-lg">급여 - {dataD.money}</div>
                        <div className="text-lg">지역 - {dataD.region}</div>
                        <div className="text-lg">
                            <FontAwesomeIcon icon={faCalendarDays} className="mr-2" />
                            근무 요일 - dataD.workDay
                        </div>
                        <div className="text-lg">
                            <FontAwesomeIcon icon={faClock} className="mr-2" />
                            근무 시간 - dataD.workTime
                        </div>
                    </div>
                    <hr />
                    <div className="m-2 flex flex-col space-y-4">
                        <div className="text-xl font-semibold">직무 상세 설명</div>
                        <div className="text-lg">내용설명-content</div>
                    </div>
                </div>
            </section>

            {/* {title} {money} {region} {contact} {content} {workDay} {workTime} */}
        </>
    );
}
