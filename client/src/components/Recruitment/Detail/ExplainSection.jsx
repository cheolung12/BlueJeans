import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faClock } from '@fortawesome/free-regular-svg-icons';
import { FaWonSign } from 'react-icons/fa6';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { GiRotaryPhone } from 'react-icons/gi';
import '@fortawesome/fontawesome-free/js/all.js';

export default function ExplainSection({ loading, data }) {
    const workdDayfrom = data.workDay;

    const workDay = (workdDayfrom || '')
        .split(',')
        .sort((a, b) => {
            const sortWeek = ['일', '월', '화', '수', '목', '금', '토']; //sort용 배열
            return sortWeek.indexOf(a) - sortWeek.indexOf(b);
        })
        .join(', ');

    // 공고 게시일 ===========================================================
    const dateString = data.createdAt;

    // 주어진 문자열에서 날짜 부분만 추출 //'1997-03-12'; //
    const extractedDate = (dateString || '').split('T')[0]; // 비동기 처리하기

    // 추출된 날짜를 Date 객체로 변환
    const givenDate = new Date(extractedDate);

    // 현재 날짜
    const currentDate = new Date();

    // 일수 차이 계산 (밀리초 단위로 차이 계산 후 일 수로 변환)
    const timeDifference = currentDate.getTime() - givenDate.getTime();
    const daysDifference = timeDifference / (1000 * 3600 * 24);

    const differenceInDays = Math.floor(daysDifference);
    const differenceInHours = Math.floor(timeDifference / (1000 * 3600));

    console.log(currentDate);
    console.log('시간 차이: ' + differenceInHours + '시간');
    console.log('일수 차이: ' + differenceInDays + '일 전');

    // 전화번호 자르기
    const phoneNumbers = data.contact;
    const startNumbers = (phoneNumbers || '').slice(0, 3);
    const middleNumbers = (phoneNumbers || '').slice(3, 7);
    const endNumbers = (phoneNumbers || '').slice(7);

    console.log('좋아요수', data.like);

    return (
        <>
            {loading ? (
                <Skeleton />
            ) : (
                <div className="m-2 text-gray-600">
                    {differenceInDays == 0 ? `${differenceInHours}시간 전 작성` : `${differenceInDays}일 전 작성`}
                </div>
            )}

            <hr />
            {loading ? (
                <div className="m-2 flex flex-col space-y-4">
                    <div className="text-xl font-semibold">정보</div>
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                </div>
            ) : (
                <div className="m-2 flex flex-col space-y-4">
                    <div className="text-xl font-semibold">정보</div>
                    <div className="text-lg flex items-center">
                        <FaWonSign className="mr-2" />
                        급여 - {data.moneyStandard} {data.money.toLocaleString()}원
                    </div>
                    <div className="text-lg flex items-center">
                        <FaMapMarkerAlt className="mr-2" />
                        지역 - {data.region}
                    </div>
                    <div className="text-lg">
                        <FontAwesomeIcon icon={faCalendarDays} className="mr-2" />
                        근무 요일 - {workDay}
                    </div>
                    <div className="text-lg">
                        <FontAwesomeIcon icon={faClock} className="mr-2" />
                        근무 시간 - {data.workTime}
                    </div>
                    <div className="text-lg flex items-center">
                        <GiRotaryPhone className="mr-2" />
                        연락처 - {startNumbers}-{middleNumbers}-{endNumbers}
                    </div>
                </div>
            )}
            <hr />
            <div className="m-2 flex flex-col space-y-4">
                <div className="text-xl font-semibold">직무 상세 설명</div>
                <div className="text-lg">
                    {/*내용설명-*/}
                    {data.content}
                </div>
            </div>
        </>
    );
}
