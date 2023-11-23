import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWonSign, faMapLocationDot, faCalendarDays, faClock } from '@fortawesome/free-regular-svg-icons';
import '@fortawesome/fontawesome-free/js/all.js';

export default function DetailExample({ data }) {
    const dataD = data.state.dataDetail;

    const sampleimg = '/images/s1.jpeg';

    return (
        <>
            <section className="flex flex-col justify-center">
                <div className="w-[750px]">
                    <div>=={dataD.id}번 일자리==</div>
                    <div className="w-full h-[450px] overflow-hidden border border-solid rounded-lg flex items-center justify-center">
                        <img className="w-full h-auto " src={sampleimg} alt="직업 소개 이미지" />
                    </div>
                    <div className="m-2">글쓴이 프로필</div>
                    <div className="m-2 text-2xl font-bold flex">
                        <p className="">제목-{dataD.title}</p>
                        <div className="flex justify-end">
                            <p className="">마감 여부</p>
                            <p className="">공고 지원 하기</p>
                        </div>
                    </div>
                    <div className="m-2 text-gray-600">공고게시일 ex.7일전 or 년월일</div>
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
