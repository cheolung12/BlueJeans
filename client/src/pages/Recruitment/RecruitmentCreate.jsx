import React, { useRef, useState } from 'react';
import axios from 'axios';
import DaumPostcode from 'react-daum-postcode';
import Modal from 'react-modal';

export default function RecruitmentCreate() {
    const [recruitmentData, setRecruitmentData] = useState({
        title: '',
        moneyStandard: '시급',
        money: 0,
        region: '',
        content: '',
        contact: '',
        workDay: '',
        workTime: '',
    });

    //유효성검사
    const [formValid, setFormValid] = useState({
        title: null,
        moneyStandard: null,
        money: null,
        region: null,
        content: null,
        contact: null,
        workDay: null,
        workTime: null,
    });

    // const isFormValid = Object.values(formValid).every((value) => value === true);

    // // input별 유효성검사하기
    // setFormValid((prevData) => {
    //     let updatedData = { ...prevData };
    //     if (name === 'userID') {
    //         updatedData.userID = null;
    //     } else if (name === 'nickname') {
    //         updatedData.nickname = null;
    //     } else if (name === 'password') {
    //         updatedData.password = value === formData.pwCheck;
    //     } else if (name === 'pwCheck') {
    //         updatedData.password = formData.password === value;
    //     }
    //     return updatedData;
    // });

    // 인풋 이미지 태그 커스텀
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

    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('file', file);
        formData.append('title', recruitmentData.title);
        formData.append('moneyStandard', recruitmentData.moneyStandard);
        formData.append('money', recruitmentData.money);
        formData.append('region', recruitmentData.region);
        formData.append('contact', recruitmentData.contact);
        formData.append('content', recruitmentData.content);
        formData.append('workDay', recruitmentData.workDay);
        formData.append('workTime', recruitmentData.workTime);

        try {
            const response = await axios.post(
                'http://localhost:8080/api/jobs',
                formData,
                { withCredentials: true },
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    // 지역 선택 모달
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
        // setFormValid((prevData) => ({
        //     ...prevData,
        //     address: true,
        // }));
        setIsOpen(false);
    };

    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <form
                onSubmit={onSubmit}
                className="my-10 sm:p-14 p-0 w-full max-w-3xl h-full flex flex-col justify-center items-center border"
                encType="multipart/form-data"
            >
                <div className="sm:text-4xl text-3xl font-bold mb-2 text-[#000000]">공고 게시</div>

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
                        required
                        className="w-100 m-2 sm:h-12 h-9 p-2.5 sm:text-base text-xs block border rounded-lg text-gray-900 bg-gray-50 focus:outline-none focus:ring focus:ring-indigo-400"
                    />
                </div>
                <div className="w-full h-full flex flex-col justify-center">
                    <div className="w-full h-full flex flex-row justify-center">
                        <div className="w-full h-full flex flex-col justify-center">
                            <label className="mx-3 mt-3 text-base text-gray-600 font-semibold">급여 기준</label>
                            <div className="my-3">
                                {/*                                
                                <select className="w-100 m-2 sm:h-12 h-9 p-2.5 sm:text-base text-xs block border rounded-lg text-gray-900 bg-gray-50 focus:outline-none focus:ring focus:ring-indigo-400">
                                    <option value="hourM">시급</option>
                                    <option value="dayM">일급</option>
                                    <option value="weekM">주급</option>
                                    <option value="monM">월급</option>
                                </select>*/}
                                <label className="mx-3 mt-3 text-base text-gray-600 font-semibold">
                                    시급
                                    <input
                                        className="ml-3"
                                        type="radio"
                                        name="moneyStandard"
                                        value="시급"
                                        checked={recruitmentData.moneyStandard === '시급'}
                                        onChange={handleInputChange}
                                    />
                                </label>
                                <label className="mx-3 mt-3 text-base text-gray-600 font-semibold">
                                    일급
                                    <input
                                        className="ml-3"
                                        type="radio"
                                        name="moneyStandard"
                                        value="일급"
                                        checked={recruitmentData.moneyStandard === '일급'}
                                        onChange={handleInputChange}
                                    />
                                </label>
                                <label className="mx-3 mt-3 text-base text-gray-600 font-semibold">
                                    주급
                                    <input
                                        className="ml-3"
                                        type="radio"
                                        name="moneyStandard"
                                        value="주급"
                                        checked={recruitmentData.moneyStandard === '주급'}
                                        onChange={handleInputChange}
                                    />
                                </label>
                                <label className="mx-3 mt-3 text-base text-gray-600 font-semibold">
                                    월급
                                    <input
                                        className="ml-3"
                                        type="radio"
                                        name="moneyStandard"
                                        value="월급"
                                        checked={recruitmentData.moneyStandard === '월급'}
                                        onChange={handleInputChange}
                                    />
                                </label>
                            </div>
                        </div>
                        <div className="w-full h-full flex flex-col justify-center">
                            <label htmlFor="money" className="mx-3 mt-3 text-base text-gray-600 font-semibold">
                                급여 (단위 : 원)
                            </label>
                            <input
                                id="money"
                                className="w-100 m-2 sm:h-12 h-9 p-2.5 sm:text-base text-xs block border rounded-lg text-gray-900 bg-gray-50 focus:outline-none focus:ring focus:ring-indigo-400"
                                value={recruitmentData.money}
                                onChange={handleInputChange}
                                name="money"
                                type="text"
                                placeholder="급여를 입력하세요"
                                required
                            />
                        </div>
                    </div>
                </div>
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
                        required
                    />
                    <Modal isOpen={isOpen} ariaHideApp={false} style={customStyles}>
                        <DaumPostcode onComplete={completeHandler} height="100%" />
                        <div className="flex justify-end pr-4">
                            <button onClick={modalToggle}>[ 닫기 ]</button>
                        </div>
                    </Modal>
                </div>

                <div className="w-full h-full flex flex-col justify-center">
                    <div className="w-full h-full flex flex-row justify-center">
                        <div className="w-full h-full flex flex-col justify-center">
                            <label htmlFor="workDay" className="mx-3 mt-3 text-base text-gray-600 font-semibold">
                                근무 요일
                            </label>
                            <input
                                id="workDay"
                                className="w-100 m-2 sm:h-12 h-9 p-2.5 sm:text-base text-xs block border rounded-lg text-gray-900 bg-gray-50 focus:outline-none focus:ring focus:ring-indigo-400"
                                value={recruitmentData.workDay}
                                onChange={handleInputChange}
                                name="workDay"
                                type="text"
                                placeholder="예) 월요일~금요일, 주말"
                                required
                            />
                        </div>
                        <div className="w-full h-full flex flex-col justify-center">
                            <label htmlFor="workTime" className="mx-3 mt-3 text-base text-gray-600 font-semibold">
                                근무 시간
                            </label>
                            <input
                                id="workTime"
                                className="w-100 m-2 sm:h-12 h-9 p-2.5 sm:text-base text-xs block border rounded-lg text-gray-900 bg-gray-50 focus:outline-none focus:ring focus:ring-indigo-400"
                                value={recruitmentData.workTime}
                                onChange={handleInputChange}
                                name="workTime"
                                type="text"
                                placeholder="예) 15:00 ~ 20:00"
                                required
                            />
                        </div>
                    </div>
                </div>

                <div className="w-full h-full flex flex-col justify-center">
                    <div className="w-full h-full flex flex-row justify-center">
                        <div className="w-full h-full flex flex-col justify-center">
                            <label htmlFor="workDay" className="mx-3 mt-3 text-base text-gray-600 font-semibold">
                                근무 요일
                            </label>
                            <select className="w-100 m-2 sm:h-12 h-9 p-2.5 sm:text-base text-xs block border rounded-lg text-gray-900 bg-gray-50 focus:outline-none focus:ring focus:ring-indigo-400">
                                <option value="hourM">시급</option>
                                <option value="dayM">일급</option>
                                <option value="weekM">주급</option>
                                <option value="monM">월급</option>
                            </select>
                        </div>
                        <div className="w-full h-full flex flex-col justify-center">
                            <label htmlFor="workTime" className="mx-3 mt-3 text-base text-gray-600 font-semibold">
                                근무 시간
                            </label>
                            <select className="w-100 m-2 sm:h-12 h-9 p-2.5 sm:text-base text-xs block border rounded-lg text-gray-900 bg-gray-50 focus:outline-none focus:ring focus:ring-indigo-400">
                                <option value="hourM">시급</option>
                                <option value="dayM">일급</option>
                                <option value="weekM">주급</option>
                                <option value="monM">월급</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="w-full h-full flex flex-col justify-center">
                    <label htmlFor="contact" className="mx-3 mt-3 text-base text-gray-600 font-semibold">
                        연락처
                    </label>
                    <input
                        id="contact"
                        className="w-100 m-2 sm:h-12 h-9 p-2.5 sm:text-base text-xs block border rounded-lg text-gray-900 bg-gray-50 focus:outline-none focus:ring focus:ring-indigo-400"
                        value={recruitmentData.contact}
                        onChange={handleInputChange}
                        name="contact"
                        type="text"
                        placeholder="' - ' 를 생략하고 입력하세요. 예) 010XXXXYYYY"
                        required
                    />
                </div>
                <div className="w-full h-full flex flex-col justify-center">
                    <div className="w-full h-full flex flex-row">
                        <label className="mx-3 mt-3 text-base text-gray-600 font-semibold">근무지 사진 첨부</label>
                        <label
                            className="mx-3 mt-2 h-[2rem] inline-flex items-center justify-center px-2 py-2  text-white bg-gray-400 rounded-lg cursor-pointer"
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
                        className="my-3 w-[10rem] h-[3rem] inline-flex items-center justify-center px-2 py-2  text-white bg-gray-400 rounded-lg "
                    >
                        공고 게시하기
                    </button>
                </div>
            </form>
        </div>
    );
}
