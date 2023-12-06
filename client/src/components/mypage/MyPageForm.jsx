import React, { useState, useRef } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import DaumPostcode from 'react-daum-postcode';

export default function MyPageForm({ userInfo, setUserInfo }) {
    const imgRef = useRef(null);
    const [file, setFile] = useState(null); // 폼 전송용
    const [imagePreview, setImagePreview] = useState(null); // 업로드후 사진 미리보기용
    const [editPW, setEditPW] = useState(false);
    const [newPW, setNewPW] = useState({ pw: null, pwCheck: null });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDuplicate, setIsDuplicate] = useState(null);

    // modal 스타일
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

    const handleFileChange = (e) => {
        if (imgRef.current.value !== null) {
            setFile(e.target.files[0]);

            const forThumb = imgRef.current.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(forThumb);
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
        } else {
            console.log('파일 없음');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserInfo((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handlePWChange = (e) => {
        const { name, value } = e.target;
        setNewPW((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const toggleAddressModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    // 주소창 닫을때 입력값으로 설정
    const completeHandler = (data) => {
        setUserInfo((prevData) => ({
            ...prevData,
            address: data.roadAddress,
        }));
        setIsModalOpen(false);
    };

    // 비밀번호 변경 input 열고 닫기
    const editPwToggle = () => {
        if (editPW) {
            setNewPW({ pw: null, pwCheck: null });
        }
        setEditPW((prev) => !prev);
    };

    // 닉네임 중복 확인
    const checkDuplication = async () => {
        try {
            const res = await axios({
                method: 'POST',
                url: `${process.env.REACT_APP_SERVER}/user/check?type=nickname&value=${userInfo.nickname}`,
            });
            console.log(res.data);
            if (!res.data) {
                setIsDuplicate(true);
                alert('사용 가능한 닉네임입니다.');
            } else {
                setIsDuplicate(false);
                alert('다른 닉네임으로 설정해주세요');
            }
        } catch (error) {
            console.error(error);
        }
    };

    // 회원 정보 수정 폼 제출
    const handleSubmit = async (e) => {
        e.preventDefault();

        // 비밀번호가 다르면 그냥 리턴
        if (newPW.pwCheck !== newPW.pw) {
            alert('비밀번호를 확인해주세요.');
            return;
        }

        // 닉네임 중복 확인
        if (!isDuplicate) {
            alert('닉네임 중복 확인을 해주세요.');
            return;
        }

        const formData = new FormData();
        formData.append('nickname', userInfo.nickname);
        formData.append('address', userInfo.address);
        formData.append('password', newPW.pw);
        formData.append('file', file);
        for (var [key, value] of formData.entries()) {
            console.log(key, ':', value);
        }

        try {
            const response = await axios({
                method: 'PATCH',
                url: `${process.env.REACT_APP_SERVER}/mypage`,
                data: formData,
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('수정 여부', response.data);
            if (response.data) {
                alert('회원 정보 수정이 완료되었습니다.');
                localStorage.setItem('nickname', userInfo.nickname);
                localStorage.setItem('address', userInfo.address);
            } else {
                alert('※ 회원 정보 수정에 실패했습니다.');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-xl h-full flex flex-col justify-center items-center" encType="multipart/form-data">
            <div className="w-full h-full flex flex-col justify-center">
                <div className="w-full h-full flex flex-row"></div>
            </div>
            <div className="w-56 h-56 rounded-full flex justify-center items-center bg-blue-900">
                <img
                    className="w-full h-full overflow-hidden rounded-full flex justify-center items-center"
                    src={imagePreview ? imagePreview : userInfo.img_path}
                    alt="회원 프로필 이미지"
                />
            </div>
            <input className="hidden" type="file" name="file" id="inputImg" ref={imgRef} onChange={handleFileChange} accept="*" />
            <div className="flex flex-col justify-center items-center">
                <label
                    className="my-6 w-[10rem] h-[3rem] inline-flex items-center justify-center px-2 py-2  text-black bg-slate-100 rounded-lg hover:opacity-90 cursor-pointer"
                    htmlFor="inputImg"
                >
                    프로필 사진 변경
                </label>
            </div>

            <div className="mb-4 w-full h-full flex flex-row justify-center text-center">{userInfo.userId} 님의 회원 정보</div>
            <div className="mb-3 w-full h-full flex flex-row justify-center">
                <label htmlFor="nickname" className=" m-1 px-1 py-1.5 text-gray-600 font-semibold">
                    닉네임 :
                </label>
                <div className="flex justify-between items-center box-border w-72 h-12 p-2.5 sm:text-base text-xs border rounded-lg text-gray-900 bg-gray-50 shadow-sm  focus-within:ring-2 focus-within:ring-signatureColor">
                    <input
                        id="nickname"
                        value={userInfo.nickname}
                        onChange={handleInputChange}
                        name="nickname"
                        type="text"
                        autoComplete="off"
                        placeholder="닉네임을 입력하세요."
                        className="w-full h-full bg-inherit outline-none border-none focus:outline-none rounded-lg"
                        required
                    />
                    <button
                        id="nickname-duplication"
                        type="button"
                        onClick={checkDuplication}
                        className="sm:w-24 w-20 sm:h-8 h-6 border sm:text-sm text-xs bg-white rounded-md"
                    >
                        중복 확인
                    </button>
                </div>
            </div>
            <div className="mb-3 w-full h-full flex flex-row justify-center">
                <label htmlFor="address" className=" m-1 px-1 py-1.5 text-gray-600 font-semibold">
                    거주지 :
                </label>
                <div className="flex justify-between items-center box-border w-72 h-12 p-2.5 sm:text-base text-xs border rounded-lg text-gray-900 bg-gray-50 shadow-sm  focus-within:ring-2 focus-within:ring-signatureColor">
                    <input
                        id="address"
                        value={userInfo.address}
                        onChange={handleInputChange}
                        autoComplete="off"
                        name="address"
                        type="text"
                        onClick={toggleAddressModal}
                        className="w-full h-full bg-inherit outline-none border-none focus:outline-none rounded-lg"
                    />
                </div>
                <Modal isOpen={isModalOpen} ariaHideApp={false} style={customStyles}>
                    <DaumPostcode onComplete={completeHandler} height="100%" />
                    <div className="flex justify-end pr-4">
                        <button onClick={toggleAddressModal}>[ 닫기 ]</button>
                    </div>
                </Modal>
            </div>

            <div className="flex flex-col justify-center items-center">
                <div
                    className="my-2 w-[10rem] h-[3rem] inline-flex items-center justify-center px-2 py-2  text-white bg-signatureColor rounded-lg hover:opacity-90 cursor-pointer"
                    onClick={editPwToggle}
                >
                    {!editPW ? '비밀번호 변경하기' : '비밀번호 변경취소'}
                </div>
            </div>

            {editPW ? (
                <div className="mb-2 ">
                    <div className="w-full h-full flex flex-row justify-center">
                        <label htmlFor="password" className=" m-1 px-1 py-1.5 text-gray-600 font-semibold">
                            비밀번호 입력 :
                        </label>
                        <input
                            type="password"
                            id="pw"
                            name="pw"
                            value={newPW.pw}
                            onChange={handlePWChange}
                            placeholder="비밀번호를 입력해주세요."
                            className="w-72 m-1 h-9 px-1 py-2.5 sm:text-base text-xs block border rounded-lg text-gray-900 bg-gray-50 focus:outline-none focus:ring focus:ring-signatureColor"
                        />
                    </div>
                    <div className="w-full h-full flex flex-row justify-center">
                        <label htmlFor="pwCheck" className=" m-1 px-1 py-1.5 text-gray-600 font-semibold">
                            비밀번호 확인:
                        </label>
                        <input
                            type="password"
                            id="pwCheck"
                            name="pwCheck"
                            value={newPW.pwCheck}
                            onChange={handlePWChange}
                            placeholder="비밀번호를 한 번 더 입력해주세요."
                            className="w-72 m-1 h-9 px-1 py-2.5 sm:text-base text-xs block border rounded-lg text-gray-900 bg-gray-50 focus:outline-none focus:ring focus:ring-signatureColor"
                        />
                    </div>
                </div>
            ) : (
                <div></div>
            )}
            <div className="flex flex-col justify-center items-center">
                <button
                    className="my-2 w-[7rem] h-[3rem] inline-flex items-center justify-center px-2 py-2  text-white bg-signatureColor rounded-lg hover:opacity-90 "
                    type="submit"
                >
                    수정 하기
                </button>
            </div>
        </form>
    );
}
