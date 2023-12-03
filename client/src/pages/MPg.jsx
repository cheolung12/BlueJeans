import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TopNavbar from '../components/common/TopNavbar';
import Mppp from '../components/mypage/Mppp';
import Modal from 'react-modal';

export default function MP() {
    const [myPost, setMyPost] = useState(false);
    const [myHome, setMyHome] = useState(true);
    const [myHeart, setMyHeart] = useState(false);
    const [userInfo, setUserInfo] = useState({
        nickname: '',
        address: '',
        likedPost: [],
        writedPost: [],
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
                const { nickname, address, likedPost, writedPost } = res.data;
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
                    nickname,
                    address,
                    likedPost: sortedLikedPost,
                    writedPost: sortedWritedPost,
                });
            } catch (error) {
                console.log('fetch error', error);
            }
        };

        fetchData();
    }, []);

    const toggleMyPost = () => {
        setMyPost((prev) => !prev);
    };

    const myhome = () => {
        setMyHome(true);
        setMyPost(false);
        setMyHeart(false);
    };

    const mypost = () => {
        setMyHome(false);
        setMyPost(true);
        setMyHeart(false);
    };

    const myheart = () => {
        setMyHome(false);
        setMyPost(false);
        setMyHeart(true);
    };

    // 회원 탈퇴
    const exit = async () => {
        try {
            const response = await axios({
                method: 'DELETE',
                url: `${process.env.REACT_APP_SERVER}/user/{id}`,
                withCredentials: true,
            });
            console.log(response);
            alert('회원 탈퇴가 완료되었습니다.');
        } catch (error) {
            console.error('Error data:', error);
        }
    };

    // 회원 정보 수정

    const editInfo = async (e) => {
        e.preventDefault();

        const editUsefData = new FormData();
        try {
            const response = await axios({
                method: 'PATCH',
                url: `${process.env.REACT_APP_SERVER}/user/{id}`,
                data: editUsefData,
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data);
            alert('회원 정보 수정이 완료되었습니다.');
        } catch (error) {
            console.error(error);
            alert('※ 회원 정보 수정에 실패했습니다.');
        }
    };

    const editModal = () => {
        setIsOpen(!isOpen);
    };

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

    console.log(myHome, myPost, myHeart);

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
                                    src=""
                                    alt="회원 프로필 이미지"
                                />
                            </div>
                            <div>회원 닉네임 님</div>
                            <div className="bg-white rounded-md px-3 py-2 cursor-pointer" onClick={editModal}>
                                회원 정보 수정
                            </div>
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
                    </div>
                </div>
                {/* 게시물 보기 */}
                <div className="lg:w-2/3 w-full h-full box-border px-8 ">
                    <div className="w-full">
                        {myHome ? (
                            <div className="space-y-3">
                                <div className="mt-3 text-blue-900 font-semibold lg:text-4xl text-2xl ">MY 홈</div>
                                <div className="py-5 border border-gray-100 shadow-md flex flex-col justify-center items-center space-y-4">
                                    <div className="w-56 h-56 rounded-full flex justify-center items-center bg-blue-900">
                                        <img
                                            className="w-full h-full overflow-hidden rounded-full flex justify-center items-center"
                                            src=""
                                            alt="회원 프로필 이미지"
                                        />
                                    </div>
                                    <div>{userInfo.nickname} 님</div>
                                    <div>닉네임 : {userInfo.nickname}</div>
                                    <div>거주지 : {userInfo.nickname}</div>
                                    <div className="flex justify-center sm:flex-row flex-col">
                                        <div className="m-1 p-3 bg-blue-500 rounded-md cursor-pointer text-center" onClick={editModal}>
                                            회원 정보 수정
                                        </div>
                                        <div className="m-1 p-3 bg-blue-500 rounded-md cursor-pointer text-center" onClick={exit}>
                                            회원 탈퇴
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div />
                        )}
                        {myHeart ? (
                            <div>
                                <div>내가 찜한 게시물</div>
                                <Mppp postLists={userInfo.likedPost} />
                            </div>
                        ) : (
                            <div />
                        )}
                        {myPost ? (
                            <div>
                                <div>내가 작성한 게시물</div>
                                <Mppp postLists={userInfo.writedPost} />
                            </div>
                        ) : (
                            <div />
                        )}
                    </div>
                </div>
            </div>
            <Modal isOpen={isOpen} ariaHideApp={false} style={customStyles}>
                <div className="flex flex-col">
                    <div>회원 정보 수정</div>
                    <form onSubmit={editInfo} className="flex flex-col">
                        <label htmlFor="">닉네임</label>
                        <input type="text" />
                        <label htmlFor="">거주지</label>
                        <input type="text" />
                        <button type="submit">수정 하기</button>
                    </form>
                    <div className="cursor-pointer" onClick={editModal}>
                        [ 닫기 ]
                    </div>
                </div>
            </Modal>
        </div>
    );
}
