import React, { useRef, useState } from 'react';
import axios from 'axios';

export default function RecruitmentCreate() {
    const [recruitmentData, setRecruitmentData] = useState({
        title: '',
        moneyStandard: '시급',
        money: 0,
        region: '',
        content: '',
        contact: '',
        workDay: '',
        wordTime: '',
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
        wordTime: null,
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
    formData.append("file", file);
    formData.append("title", recruitmentData.title);
    formData.append("money", recruitmentData.money);
    formData.append("region", recruitmentData.region);
    formData.append("contact", recruitmentData.contact);
    formData.append("content", recruitmentData.content);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/jobs",
        formData,
        { withCredentials: true },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
            });

            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <div className="sm:text-4xl text-3xl font-bold mb-2 text-[#000000]">공고 게시</div>
            <form
                onSubmit={onSubmit}
                className="w-full max-w-2xl h-full flex flex-col justify-center items-center border"
                encType="multipart/form-data"
            >
                <div className="w-full h-full flex flex-col justify-center">
                    <label htmlFor="title" className="mx-3 mt-3 text-base text-gray-600 font-semibold">
                        제목
                    </label>
                    <input
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
                            <label htmlFor="moneyStandard" className="mx-3 mt-3 text-base text-gray-600 font-semibold">
                                급여 기준
                            </label>
                            <div className="my-3">
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
                        value={recruitmentData.region}
                        className="m-2 sm:h-12 h-9 p-2.5 sm:text-base text-xs block border rounded-lg text-gray-900 bg-gray-50 focus:outline-none focus:ring focus:ring-indigo-400"
                        onChange={handleInputChange}
                        name="region"
                        type="text"
                        placeholder="예) 서울특별시 중구"
                        required
                    />
                </div>
                <div className="w-full h-full flex flex-col justify-center">
                    <label htmlFor="contact" className="mx-3 mt-3 text-base text-gray-600 font-semibold">
                        연락처
                    </label>
                    <input
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
                        <label htmlFor="file" className="mx-3 mt-3 text-base text-gray-600 font-semibold">
                            근무지 사진 첨부
                        </label>
                        <label
                            className="mx-3 mt-2 h-[2rem] inline-flex items-center justify-center px-2 py-2  text-white bg-gray-400 rounded-lg cursor-pointer"
                            for="inputImg"
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
