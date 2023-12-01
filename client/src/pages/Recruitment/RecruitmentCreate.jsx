import React, { useRef, useState } from 'react';
import axios from 'axios';
import DaumPostcode from 'react-daum-postcode';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';

export default function RecruitmentCreate() {
    const navigate = useNavigate();

    const [recruitmentData, setRecruitmentData] = useState({
        title: '',
        money: 9620,
        region: '',
        content: '',
        contact: '',
    });

    // 인풋 이미지 태그 커스텀//////////////////////////////////////////////////////////////
    const imgRef = useRef(null);
    const [file, setFile] = useState(null);
    const [placeholder, setPlaceholder] = useState('첨부파일');

    const handleFileChange = (e) => {
        //못생긴 Input File의 onChange에 넣었던 함수!
        if (imgRef.current.value !== '') {
            //값이 텅 빈 것이 아니라면
            const fileName = imgRef.current.value; //현재 파일 값을 정의!
            setPlaceholder(fileName); //useState로 그 값을 placeholder에 넣기!
        } else {
            console.log('파일 없음');
        }
        setFile(e.target.files[0]);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setRecruitmentData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // form 제출 및 통신 ////////////////////////////////////////////////////////////////
    const onSubmit = async (e) => {
        e.preventDefault();

        const recruitData = new FormData();
        recruitData.append('title', recruitmentData.title);
        const workDay = clickedDays.join(',');
        recruitData.append('workDay', workDay);
        const workTime = workTime1 + ' ~ ' + workTime2;
        recruitData.append('workTime', workTime);
        recruitData.append('moneyStandard', moneyStandard);
        recruitData.append('money', recruitmentData.money);
        recruitData.append('region', recruitmentData.region);
        recruitData.append('contact', recruitmentData.contact);
        recruitData.append('content', recruitmentData.content);
        recruitData.append('file', file);

        if (recruitData.get('region').length === 0) {
            alert('※ 지역을 입력하세요');
            return;
        }

        const numericRegex = /^[0-9]+$/;

        if (!numericRegex.test(recruitData.get('contact'))) {
            alert('※ 연락처에는 숫자만 입력하세요');
            return;
        }

        try {
            const response = await axios({
                method: 'POST',
                url: `${process.env.REACT_APP_SERVER}/jobs`,
                data: recruitData,
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data);
            alert('공고 게시가 완료되었습니다.');
            navigate('/recruitment');
        } catch (error) {
            console.error(error);
            alert('※ 공고 게시에 실패했습니다.');
        }

        for (var [key, value] of recruitData.entries()) {
            console.log(key, ':', value);
        }
    };

    // 지역 선택 /////////////////////////////////////////////////////////////////////
    const [isOpen, setIsOpen] = useState(false);

    // 주소 modal 스타일
    const customStyles = {
        overlay: {
            backgroundColor: 'rgba(0,0,0,0.5)',
        },
        content: {
            left: '0',
            margin: 'auto',
            width: '500px',
            height: 'fit-content',
            padding: '0',
            overflow: 'hidden',
        },
    };

    const modalToggle = () => {
        setIsOpen(!isOpen);
    };

    // 주소창 닫을때 입력값으로 설정
    const completeHandler = (data) => {
        setRecruitmentData((prevData) => ({
            ...prevData,
            region: data.roadAddress,
        }));
        setIsOpen(false);
    };

    //근무 요일 토글//////////////////////////////////////////////////////////////////////////////
    const [clickedDays, setClickedDays] = useState(['월', '화', '수', '목', '금']);

    // 클릭 이벤트 핸들러 함수
    const handleClick = (day) => {
        const isDayClicked = clickedDays.includes(day);

        if (isDayClicked) {
            // 이미 클릭된 요일인 경우 배열에서 제거
            const updatedDays = clickedDays.filter((clickedDay) => clickedDay !== day);
            setClickedDays(updatedDays.sort());
        } else {
            // 클릭된 요일이 아닌 경우 배열에 추가
            const updatedDays = [...clickedDays, day].sort((a, b) => {
                const sortWeek = ['일', '월', '화', '수', '목', '금', '토']; //sort용 배열
                return sortWeek.indexOf(a) - sortWeek.indexOf(b);
            });
            setClickedDays(updatedDays);
        }
    };

    // 요일 정보를 담은 배열
    const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

    //급여 기준 토글/////////////////////////////////////////////////////////////////////////////

    const [moneyStandard, setMoneyStandard] = useState('시급');
    const monStanChange = (e) => {
        const type = e.target.value;
        setMoneyStandard(type);
    };

    console.log(moneyStandard);

    //근무 시간 select ////////////////////////////////////////////////////////////////////
    // 00:00~23:30 시간 설정용 배열 생성
    const hours = Array.from({ length: 24 }, (_, index) => index);
    const minutes = ['00', '30'];
    const time = hours.reduce((acc, hour) => {
        minutes.forEach((minute) => {
            acc.push(`${hour < 10 ? '0' + hour : hour}:${minute}`);
        });
        return acc;
    }, []);

    // 근무 시간 변수
    const [workTime1, setWorkTime1] = useState('10:00');
    const [workTime2, setWorkTime2] = useState('12:00');
    // 셀렉트 처리
    const handleTimeChange1 = (event) => {
        setWorkTime1(event.target.value);
    };
    const handleTimeChange2 = (event) => {
        setWorkTime2(event.target.value);
    };

    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <form
                onSubmit={onSubmit}
                className=" sm:p-14 p-0 w-full max-w-3xl h-full flex flex-col justify-center items-center border"
                encType="multipart/form-data"
            >
                <div className="sm:text-4xl text-3xl font-bold mb-2 text-[#000000]">공고 게시</div>

                {/* ========================근무 제목 (done)======================== */}
                <div className="w-full h-full flex flex-col justify-center">
                    <label htmlFor="title" className="mx-3 mt-3 text-base text-gray-600 font-semibold">
                        제목
                    </label>
                    <input
                        id="title"
                        value={recruitmentData.title}
                        onChange={handleInputChange}
                        name="title"
                        type="text"
                        placeholder="제목을 입력하세요."
                        className="w-100 m-2 sm:h-12 h-9 p-2.5 sm:text-base text-xs block border rounded-lg text-gray-900 bg-gray-50 focus:outline-none focus:ring focus:ring-indigo-400"
                        required
                    />
                </div>

                {/* ========================근무 요일 (new)======================== */}
                <div className="w-full h-full flex flex-col justify-center">
                    <label className="mx-3 mt-3 mb-1 text-base text-gray-600 font-semibold">근무 요일</label>
                    <div className="flex flex-wrap justify-center">
                        {daysOfWeek.map((day, index) => (
                            <div
                                key={index}
                                className={`sm:w-16 w-12 sm:h-16 h-12 rounded-full flex items-center justify-center sm:m-2 m-0.5 border cursor-pointer ${
                                    clickedDays.includes(day) ? 'bg-signatureColor text-white' : 'bg-gray-50 text-black'
                                }`}
                                onClick={() => handleClick(day)}
                            >
                                {day}
                            </div>
                        ))}
                    </div>
                </div>

                {/* ========================근무 급여 (new)======================== */}
                <div className="w-full h-full flex flex-col justify-center">
                    <div className="w-full h-full flex flex-row justify-center">
                        <div className="w-full h-full flex flex-col justify-center">
                            <label className="mx-3 mt-3 text-base text-gray-600 font-semibold">급여 기준</label>
                            <select
                                value={moneyStandard}
                                onChange={monStanChange}
                                className="w-100 m-2 sm:h-12 h-9 p-2.5 sm:text-base text-xs block border rounded-lg text-gray-900 bg-gray-50 focus:outline-none focus:ring focus:ring-indigo-400"
                            >
                                <option value="시급">시급</option>
                                <option value="일급">일급</option>
                                <option value="주급">주급</option>
                                <option value="월급">월급</option>
                            </select>
                        </div>
                        <div className="w-full h-full flex flex-col justify-center">
                            <label htmlFor="money" className="mx-3 mt-3 text-base text-gray-600 font-semibold">
                                급여 (단위 : 원)
                            </label>
                            <input
                                id="money"
                                className="w-100 m-2 sm:h-12 h-9 p-2.5 sm:text-base text-xs block border rounded-lg text-gray-900 bg-gray-50 focus:outline-none focus:ring focus:ring-indigo-400 remove-arrow"
                                value={recruitmentData.money}
                                onChange={handleInputChange}
                                name="money"
                                type="number"
                                placeholder="급여를 입력하세요"
                                required
                            />
                        </div>
                    </div>
                </div>

                {/* ========================근무 지역 (done)======================== */}
                <div className="w-full h-full flex flex-col justify-center">
                    <label htmlFor="region" className="mx-3 mt-3 text-base text-gray-600 font-semibold">
                        근무 지역
                    </label>
                    <input
                        type="text"
                        id="region"
                        name="region"
                        value={recruitmentData.region}
                        onChange={handleInputChange}
                        autoComplete="off"
                        onClick={modalToggle}
                        readOnly
                        placeholder="클릭하면 주소검색창이 나타납니다."
                        className="w-100 m-2 sm:h-12 h-9 p-2.5 sm:text-base text-xs block border rounded-lg text-gray-900 bg-gray-50 focus:outline-none focus:ring focus:ring-indigo-400"
                    />
                    <Modal isOpen={isOpen} ariaHideApp={false} style={customStyles}>
                        <DaumPostcode onComplete={completeHandler} height="100%" />
                        <div className="flex justify-end pr-4">
                            <button onClick={modalToggle}>[ 닫기 ]</button>
                        </div>
                    </Modal>
                </div>

                {/* ========================근무 시간 (new)======================== */}
                <div className="w-full h-full flex flex-col justify-center">
                    <div className="w-full h-full flex flex-row justify-center">
                        <div className="w-full h-full flex flex-col justify-center">
                            <label htmlFor="workTime1" className="mx-3 mt-3 text-base text-gray-600 font-semibold">
                                근무 시간 (시작)
                            </label>
                            <select
                                className="w-100 m-2 sm:h-12 h-9 p-2.5 sm:text-base text-xs 
                            block border rounded-lg text-gray-900 bg-gray-50 focus:outline-none focus:ring focus:ring-indigo-400"
                                id="workTime1"
                                value={workTime1}
                                onChange={handleTimeChange1}
                            >
                                {time.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="w-full h-full flex flex-col justify-center">
                            <label htmlFor="workTime2" className="mx-3 mt-3 text-base text-gray-600 font-semibold">
                                근무 시간 (끝)
                            </label>
                            <select
                                className="w-100 m-2 sm:h-12 h-9 p-2.5 sm:text-base text-xs 
                            block border rounded-lg text-gray-900 bg-gray-50 focus:outline-none focus:ring focus:ring-indigo-400"
                                id="workTime2"
                                value={workTime2}
                                onChange={handleTimeChange2}
                            >
                                {time.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                {/* ========================근무 연락처 (-처리)======================== */}
                <div className="w-full h-full flex flex-col justify-center">
                    <label htmlFor="contact" className="mx-3 mt-3 text-base text-gray-600 font-semibold">
                        연락처
                    </label>
                    <input
                        id="contact"
                        className="w-100 m-2 sm:h-12 h-9 p-2.5 sm:text-base text-xs block border rounded-lg text-gray-900 bg-gray-50 focus:outline-none focus:ring focus:ring-indigo-400"
                        value={recruitmentData.contact}
                        maxlength="11"
                        onChange={handleInputChange}
                        name="contact"
                        type="text"
                        placeholder="' - ' 를 생략하고 입력하세요. 예) 010XXXXYYYY"
                        required
                    />
                </div>

                {/* ========================근무 사진 (done)======================== */}
                <div className="w-full h-full flex flex-col justify-center">
                    <div className="w-full h-full flex flex-row">
                        <label className="mx-3 mt-3 text-base text-gray-600 font-semibold">근무지 사진 첨부</label>
                        <label
                            className="mx-3 mt-2 h-[2rem] inline-flex items-center justify-center px-2 py-2  text-white bg-signatureColor rounded-lg cursor-pointer hover:opacity-90 "
                            htmlFor="inputImg"
                        >
                            파일 업로드
                        </label>
                    </div>
                    <input
                        className="w-100 m-2 sm:h-12 h-9 p-2.5 sm:text-base text-xs block border rounded-lg text-gray-900 bg-gray-50 focus:outline-none focus:ring focus:ring-indigo-400"
                        placeholder={placeholder}
                        disabled
                    />
                    <input className="hidden" type="file" name="file" id="inputImg" ref={imgRef} onChange={handleFileChange} accept="*" />
                </div>

                {/* ========================근무 설명 (done)======================== */}
                <div className="w-full flex flex-col justify-center">
                    <label htmlFor="content" className="mx-3 mt-3 text-base text-gray-600 font-semibold">
                        근무 설명
                    </label>
                    <textarea
                        id="content"
                        rows="7"
                        className="m-2 w-100 p-2 sm:text-base text-xs resize-none border rounded-lg text-gray-900 bg-gray-50 focus:outline-none focus:ring focus:ring-indigo-400"
                        value={recruitmentData.content}
                        onChange={handleInputChange}
                        name="content"
                        type="text"
                        placeholder="해당 근무에 대한 설명을 입력하세요."
                        required
                    />
                </div>
                <div>
                    <button
                        type="submit"
                        className="my-3 w-[10rem] h-[3rem] inline-flex items-center justify-center px-2 py-2  text-white bg-signatureColor rounded-lg hover:opacity-90 "
                    >
                        공고 게시하기
                    </button>
                </div>
            </form>
        </div>
    );
}
