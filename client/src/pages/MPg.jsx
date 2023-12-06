import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import TopNavbar from '../components/common/TopNavbar';
import Mppp from '../components/mypage/Mppp';
import Modal from 'react-modal';
import DaumPostcode from 'react-daum-postcode';
import { Link } from 'react-router-dom';

export default function MP() {
    const [myPost, setMyPost] = useState(false);
    const [myHome, setMyHome] = useState(true);
    const [myHeart, setMyHeart] = useState(false);
    const [editPw, setEditPw] = useState(false);
    const [editPwT, setEditPwT] = useState('비밀번호 변경하기');

    const [userInfo, setUserInfo] = useState({
        userId: '',
        nickname: '',
        address: '',
        likedPost: [],
        writedPost: [],
    });
    const [bfFile, setBfFile] = useState(); // 업로드전 사진 미리보기용
    const [afFile, setAfFile] = useState(); // 업로드후 사진 미리보기용
    const [file, setFile] = useState(); // 폼 전송용

    // 폼데이터 append용
    const [forEdit, setForEdit] = useState({
        nickname: '', //localStorage.getItem('nickname'),
        address: '', //localStorage.getItem('address'),
        password: '',
        pwCheck: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios({
                    method: 'GET',
                    url: `${process.env.REACT_APP_SERVER}/mypage`,
                    withCredentials: true,
                });
                console.log(res.data);
                const { userId, nickname, address, likedPost, writedPost, img_path } = res.data;
                // 최신순으로 게시물들을 정렬
                const sortedLikedPost = likedPost.sort((a, b) => {
                    const dateA = new Date(a.createdAt);
                    const dateB = new Date(b.createdAt);

                    return dateB - dateA;
                });
                const sortedWritedPost = writedPost.sort((a, b) => {
                    const dateA = new Date(a.createdAt);
                    const dateB = new Date(b.createdAt);

                    return dateB - dateA;
                });

                setUserInfo({
                    userId,
                    nickname,
                    address,
                    likedPost: sortedLikedPost,
                    writedPost: sortedWritedPost,
                });
                setBfFile(img_path);
                setFile(img_path);
                setForEdit({
                    nickname: localStorage.getItem('nickname'),
                    address,
                });
            } catch (error) {
                console.log('fetch error', error);
            }
        };

        fetchData();
    }, []);

    // 마이홈 토글
    const myhome = () => {
        setMyHome(true);
        setMyPost(false);
        setMyHeart(false);
        setForEdit({
            nickname: userInfo.nickname,
            address: userInfo.address,
        });
    };
    // 작성 게시물 토글
    const mypost = () => {
        setMyHome(false);
        setMyPost(true);
        setMyHeart(false);
    };
    // 찜한 게시물 토글
    const myheart = () => {
        setMyHome(false);
        setMyPost(false);
        setMyHeart(true);
    };

    // 닉네임 중복 확인
    const checkDuplication = async (type) => {
        // const value = editUsefData[type];
        // try {
        //     const res = await axios({
        //         method: 'POST',
        //         url: `${process.env.REACT_APP_SERVER}/user/check?type=${type}&value=${value}`,
        //     });
        //     // form 유효성 검사
        //     //   if (!res.data) {
        //     //     setFormValid((prevData) => ({
        //     //       ...prevData,
        //     //       [type]: true,
        //     //     }));
        //     //   } else {
        //     //     setFormValid((prevData) => ({
        //     //       ...prevData,
        //     //       [type]: false,
        //     //     }));
        //     //   }
        // } catch (error) {
        //     console.error(error);
        // }
    };

    // 주소 입력 //
    const [isOpen, setIsOpen] = useState(false);
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
    const addressModal = () => {
        setIsOpen(!isOpen);
    };

    // 주소창 닫을때 입력값으로 설정
    const completeHandler = (data) => {
        setForEdit((prevData) => ({
            ...prevData,
            address: data.roadAddress,
        }));
        setIsOpen(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForEdit((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // 회원 인증
    const editreq = async () => {
        try {
            const res = await axios({
                method: 'POST',
                url: `${process.env.REACT_APP_SERVER}/user/auth?password=${forEdit}`,
                withCredential: true,
            });
            console.log(res);
            alert('인증되었습니다.');
        } catch (error) {
            console.error('Error data:', error);
        }
    };

    // 비밀번호 변경 input 열고 닫기
    const editPwToggle = () => {
        setEditPw((prev) => !prev);
        if (editPwT === '비밀번호 변경하기') {
            setEditPwT('비밀번호 변경취소');
        } else if (editPwT === '비밀번호 변경취소') {
            setEditPwT('비밀번호 변경하기');
            setForEdit({ password: '', pwCheck: '' });
        }
    };

    // 인풋 이미지 태그 커스텀//////////////////////////////////////////////////////////////
    const imgRef = useRef(null);

    const handleFileChange = (e) => {
        //못생긴 Input File의 onChange에 넣었던 함수!
        if (imgRef.current.value !== '') {
            //값이 텅 빈 것이 아니라면
            // const fileName = imgRef.current.value; //현재 파일 값을 정의!
            // setPlaceholder(fileName); //useState로 그 값을 placeholder에 넣기!
            setFile(e.target.files[0]);
            const forThumb = imgRef.current.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(forThumb);
            reader.onloadend = () => {
                setAfFile(reader.result);
            };
        } else {
            console.log('파일 없음');
        }
    };

    // 회원 정보 수정 form 제출 및 통신 //
    const editInfo = async (e) => {
        e.preventDefault();

        const editUsefData = new FormData();
        if (afFile === undefined) {
            console.log('사진 없어');
        } else {
            editUsefData.append('file', file);
        }
        editUsefData.append('nickname', forEdit.nickname);
        editUsefData.append('address', forEdit.address);
        editUsefData.append('password', forEdit.password);
        // if (forEdit.password === undefined || forEdit.password === '') {
        //     console.log('비번 없어');
        // } else {
        //     editUsefData.append('password', forEdit.password);
        // }

        console.log(afFile);

        try {
            const response = await axios({
                method: 'PATCH',
                url: `${process.env.REACT_APP_SERVER}/mypage`,
                data: editUsefData,
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('수정 여부', response.data);
            localStorage.setItem('nickname', forEdit.nickname);
            alert('회원 정보 수정이 완료되었습니다.');
            // setBfFile(response.data.)
            //네이비게이션 말고 리로드
            // window.location.reload();
        } catch (error) {
            console.error(error);
            alert('※ 회원 정보 수정에 실패했습니다.');
        }

        for (var [key, value] of editUsefData.entries()) {
            console.log(key, ':', value);
        }
    };

    // 회원 탈퇴
    const exit = async () => {
        try {
            const response = await axios({
                method: 'DELETE',
                url: `${process.env.REACT_APP_SERVER}/user`,
                withCredentials: true,
            });
            console.log(response);
            alert('회원 탈퇴가 완료되었습니다.');
        } catch (error) {
            console.error('Error data:', error);
        }
    };

    return (
        <div className="w-full h-screen">
            <TopNavbar />
            <div className="flex w-full h-full lg:flex-row flex-col">
                {/* 회원정보 */}
                <div className="lg:w-1/3 w-full lg:h-full h-[500px] bg-slate-100 flex justify-center">
                    <div className="w-full lg:mt-24 mt-5 lg:flex-row flex-col">
                        <div className="m-3 flex justify-center flex-col items-center space-y-2">
                            <div className="w-24 h-24 rounded-full flex justify-center items-center bg-white">
                                <img
                                    className="w-full h-full overflow-hidden rounded-full flex justify-center items-center"
                                    src={bfFile}
                                    alt="회원 프로필 이미지"
                                />
                            </div>
                            <div>{userInfo.nickname} 님</div>
                        </div>
                        <div className="w-full flex  flex-col lg:items-end items-center my-12 lg:space-y-4 space-y-2">
                            {myHome ? (
                                <div
                                    className="px-4 py-2 text-blue-800 font-semibold lg:w-2/3 w-1/7 text-start bg-white cursor-pointer lg:rounded-l-full rounded-l-full lg:rounded-r-none rounded-r-full"
                                    onClick={myhome}
                                >
                                    MY 홈
                                </div>
                            ) : (
                                <div className="px-4 py-2 text-blue-800 font-semibold lg:w-2/3 w-1/7 text-start cursor-pointer" onClick={myhome}>
                                    MY 홈
                                </div>
                            )}

                            {myHeart ? (
                                <div
                                    className="px-4 py-2 lg:w-2/3 w-1/7 text-start bg-white cursor-pointer lg:rounded-l-full rounded-l-full lg:rounded-r-none rounded-r-full"
                                    onClick={myheart}
                                >
                                    내가 찜한 게시물
                                </div>
                            ) : (
                                <div className="px-4 py-2 lg:w-2/3 w-1/7 text-start cursor-pointer" onClick={myheart}>
                                    내가 찜한 게시물
                                </div>
                            )}
                            {myPost ? (
                                <div
                                    className="px-4 py-2 lg:w-2/3 w-1/7 text-start bg-white cursor-pointer lg:rounded-l-full rounded-l-full lg:rounded-r-none rounded-r-full"
                                    onClick={mypost}
                                >
                                    내가 작성한 게시물
                                </div>
                            ) : (
                                <div className="px-4 py-2 lg:w-2/3 w-1/7 text-start cursor-pointer" onClick={mypost}>
                                    내가 작성한 게시물
                                </div>
                            )}
                        </div>
                        <div className="mt-48 m-3 flex justify-center flex-col items-center space-y-2">
                            <div className="text-gray-600 rounded-md px-3 py-2 cursor-pointer" onClick={exit}>
                                회원 탈퇴
                            </div>
                        </div>
                    </div>
                </div>
                {/* 게시물 보기 */}
                <div className="lg:w-2/3 w-full h-full box-border px-8 ">
                    <div className="w-full h-full">
                        {myHome ? (
                            <div className="space-y-3">
                                <div className="mt-3 text-blue-900 font-semibold lg:text-4xl text-2xl ">MY 홈</div>
                                <div className="py-5 border border-gray-100 shadow-md flex flex-col justify-center items-center ">
                                    <form
                                        onSubmit={editInfo}
                                        className="w-full max-w-xl h-full flex flex-col justify-center items-center"
                                        encType="multipart/form-data"
                                    >
                                        <div className="w-full h-full flex flex-col justify-center">
                                            <div className="w-full h-full flex flex-row"></div>
                                        </div>
                                        <div className="w-56 h-56 rounded-full flex justify-center items-center bg-blue-900">
                                            <img
                                                className="w-full h-full overflow-hidden rounded-full flex justify-center items-center"
                                                src={afFile ? afFile : bfFile}
                                                alt="회원 프로필 이미지"
                                            />
                                        </div>
                                        <input
                                            className="hidden"
                                            type="file"
                                            name="file"
                                            id="inputImg"
                                            ref={imgRef}
                                            onChange={handleFileChange}
                                            accept="*"
                                        />
                                        <div className="flex flex-col justify-center items-center">
                                            <label
                                                className="my-6 w-[10rem] h-[3rem] inline-flex items-center justify-center px-2 py-2  text-black bg-slate-100 rounded-lg hover:opacity-90 cursor-pointer"
                                                htmlFor="inputImg"
                                            >
                                                프로필 사진 변경
                                            </label>
                                        </div>

                                        <div className="mb-1 w-full h-full flex flex-row justify-center text-center">
                                            {userInfo.userId} 님의 회원 정보
                                        </div>
                                        <div className="w-full h-full flex flex-row justify-center">
                                            <label htmlFor="nickname" className=" m-1 px-1 py-1.5 text-gray-600 font-semibold">
                                                닉네임 :
                                            </label>
                                            <input
                                                id="nickname"
                                                value={forEdit.nickname}
                                                onChange={handleInputChange}
                                                name="nickname"
                                                type="text"
                                                autoComplete="off"
                                                placeholder="닉네임을 입력하세요."
                                                className="w-72 m-1 h-9 px-1 py-2.5 sm:text-base text-xs block border rounded-lg text-gray-900 bg-gray-50 focus:outline-none focus:ring focus:ring-signatureColor"
                                                required
                                            />
                                            <button
                                                id="nickname-duplication"
                                                type="button"
                                                onClick={() => checkDuplication('nickname')}
                                                className="sm:w-24 w-20 sm:h-8 h-6 border sm:text-sm text-xs bg-white rounded-md"
                                            >
                                                중복 확인
                                            </button>
                                        </div>
                                        <div className="w-full h-full flex flex-row justify-center">
                                            <label htmlFor="address" className=" m-1 px-1 py-1.5 text-gray-600 font-semibold">
                                                거주지 :
                                            </label>
                                            <input
                                                id="address"
                                                value={forEdit.address}
                                                onChange={handleInputChange}
                                                autoComplete="off"
                                                name="address"
                                                type="text"
                                                onClick={addressModal}
                                                className="w-72 m-1 h-9 px-1 py-2.5 sm:text-base text-xs block border rounded-lg text-gray-900 bg-gray-50 focus:outline-none focus:ring focus:ring-signatureColor"
                                            />
                                            <Modal isOpen={isOpen} ariaHideApp={false} style={customStyles}>
                                                <DaumPostcode onComplete={completeHandler} height="100%" />
                                                <div className="flex justify-end pr-4">
                                                    <button onClick={addressModal}>[ 닫기 ]</button>
                                                </div>
                                            </Modal>
                                        </div>

                                        <div className="flex flex-col justify-center items-center">
                                            <div
                                                className="my-2 w-[10rem] h-[3rem] inline-flex items-center justify-center px-2 py-2  text-white bg-signatureColor rounded-lg hover:opacity-90 cursor-pointer"
                                                onClick={editPwToggle}
                                            >
                                                {editPwT}
                                            </div>
                                        </div>

                                        {editPw ? (
                                            <div className="mb-2 ">
                                                <div className="w-full h-full flex flex-row justify-center">
                                                    <label htmlFor="password" className=" m-1 px-1 py-1.5 text-gray-600 font-semibold">
                                                        비밀번호 입력 :
                                                    </label>
                                                    <input
                                                        type="password"
                                                        id="password"
                                                        name="password"
                                                        value={forEdit.password}
                                                        onChange={handleInputChange}
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
                                                        value={forEdit.pwCheck}
                                                        onChange={handleInputChange}
                                                        placeholder="비밀번호를 한 번 더 입력해주세요."
                                                        className="w-72 m-1 h-9 px-1 py-2.5 sm:text-base text-xs block border rounded-lg text-gray-900 bg-gray-50 focus:outline-none focus:ring focus:ring-signatureColor"
                                                    />
                                                </div>
                                                {forEdit.pwCheck && forEdit.password !== forEdit.pwCheck && (
                                                    <span className="pl-3 text-sm font-semibold text-red-600">비밀번호가 일치하지 않습니다.</span>
                                                )}
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
                                    <div className="flex justify-center sm:flex-row flex-col">
                                        <Link
                                            className="m-1 p-3 bg-blue-500 rounded-md text-center to>회원 정보 수정"
                                            to={`/useredit`}
                                            state={{ userInfo: userInfo }}
                                        >
                                            회원 정보 수정
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div />
                        )}
                        {myHeart ? (
                            <div className="space-y-3 overflow-y-scroll max-h-[60vw]">
                                <div className="mt-3 mb-8 font-semibold lg:text-3xl text-2xl ">내가 찜한 게시물</div>
                                <div className="flex flex-wrap justify-center">
                                    <Mppp postLists={userInfo.likedPost} />
                                </div>
                            </div>
                        ) : (
                            <div />
                        )}
                        {myPost ? (
                            <div className="space-y-3">
                                <div className="mt-3 font-semibold lg:text-3xl text-2xl">내가 작성한 게시물</div>
                                <Mppp postLists={userInfo.writedPost} />
                            </div>
                        ) : (
                            <div />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
