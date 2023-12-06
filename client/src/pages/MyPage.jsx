import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TopNavbar from '../components/common/TopNavbar';
import SideMenuList from '../components/mypage/SideMenuList';
import WithDrawal from '../components/mypage/WithDrawal';
import SideMenuContent from '../components/mypage/SideMenuContent';

export default function MyPage() {
    // 불러온 회원 정보
    const [userInfo, setUserInfo] = useState({});
    // 사이드 메뉴
    const [sideMenu, setSideMenu] = useState({
        myHome: true,
        myPost: false,
        myHeart: false,
    });
    console.log(sideMenu);

    // 첫 로드시 데이터 받기
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios({
                    method: 'GET',
                    url: `${process.env.REACT_APP_SERVER}/mypage`,
                    withCredentials: true,
                });
                if (res.data) {
                    const { userId, nickname, address, likedPost, writedPost, img_path } = res.data;
                    setUserInfo({
                        userId,
                        nickname,
                        address,
                        img_path,
                        likedPost: sortArray(likedPost),
                        writedPost: sortArray(writedPost),
                    });
                    console.log(res.data);
                } else {
                    console.log('데이터 불러오기 실패!');
                }
            } catch (error) {
                console.log('fetch error', error);
            }
        };
        fetchData();
    }, []);

    // 받아온 게시물들을 시간순 정렬해주는 함수
    const sortArray = (arr) => {
        return arr.sort((a, b) => {
            const dateA = new Date(a.createdAt);
            const dateB = new Date(b.createdAt);

            return dateB - dateA;
        });
    };

    return (
        <div className="w-full h-screen">
            <TopNavbar />
            <div className="flex w-full h-full lg:flex-row flex-col">
                <div
                    className="lg:w-1/3 w-full lg:h-full h-[500px]flex justify-center"
                    style={{
                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${'/images/main-vtb.png'})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <div className="w-full lg:mt-24 mt-5 lg:flex-row flex-col">
                        <div className="m-3 flex justify-center flex-col items-center space-y-2">
                            <div className="w-36 h-36 rounded-full flex justify-center items-center mb-2 bg-white">
                                <img
                                    className="w-full h-full overflow-hidden rounded-full flex justify-center items-center"
                                    src={userInfo.img_path}
                                    alt="회원 프로필 이미지"
                                />
                            </div>
                            <div className="font-semibold text-3xl text-slate-100">{localStorage.getItem('nickname')} 님</div>
                        </div>
                        <SideMenuList sideMenu={sideMenu} setSideMenu={setSideMenu} />
                        <WithDrawal />
                    </div>
                </div>
                <SideMenuContent sideMenu={sideMenu} userInfo={userInfo} setUserInfo={setUserInfo} />
            </div>
        </div>
    );
}
