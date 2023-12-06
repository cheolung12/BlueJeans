import React, { useState, useEffect } from 'react';

export default function SideMenuList({ sideMenu, setSideMenu }) {
    const { myHome, myPost, myHeart } = sideMenu;

    const [textColor, setTextColor] = useState({
        myHome: 'blue-800',
        myPost: 'white',
        myHeart: 'white',
    });

    const changeSideMenu = (type) => {
        setSideMenu((prev) => {
            const updatedMenu = {};

            // 모든 키에 대해 false로 설정
            Object.keys(prev).forEach((key) => {
                updatedMenu[key] = key === type ? !prev[key] : false;
            });

            if (prev[type]) {
                updatedMenu[type] = prev[type];
            }

            return updatedMenu;
        });
    };
    useEffect(() => {
        if (myHome === true) {
            setTextColor({ myHome: 'blue-800', myPost: 'white', myHeart: 'white' });
        } else if (myPost === true) {
            setTextColor({ myPost: 'blue-800', myHeart: 'white', myHome: 'white' });
        } else if (myHeart === true) {
            setTextColor({ myHeart: 'blue-800', myPost: 'white', myHome: 'white' });
        }
    }, [myHome, myPost, myHeart]);

    console.log('마이포스트', myPost);

    return (
        <div className="w-full flex  flex-col lg:items-end items-center my-12 lg:space-y-6 space-y-2">
            <div
                className={`flex justify-start items-center px-4 py-2 font-semibold lg:w-2/3 w-1/7 h-[60px] text-xl cursor-pointer text-${
                    textColor.myHome
                }  ${myHome && 'bg-white lg:rounded-l-full rounded-l-full lg:rounded-r-none rounded-r-full'}`}
                onClick={() => changeSideMenu('myHome')}
            >
                회원 정보 수정
            </div>
            <div
                className={`flex justify-start items-center px-4 py-2 font-semibold lg:w-2/3 w-1/7 h-[60px] text-xl cursor-pointer text-${
                    textColor.myHeart
                }   ${myHeart && 'bg-white lg:rounded-l-full rounded-l-full lg:rounded-r-none rounded-r-full'}`}
                onClick={() => changeSideMenu('myHeart')}
            >
                내가 찜한 게시물
            </div>
            <div
                className={`flex justify-start items-center px-4 py-2 font-semibold lg:w-2/3 w-1/7 h-[60px] text-xl cursor-pointer text-${
                    textColor.myPost
                } ${myPost && 'bg-white lg:rounded-l-full rounded-l-full lg:rounded-r-none rounded-r-full'}`}
                onClick={() => changeSideMenu('myPost')}
            >
                내가 작성한 게시물
            </div>
        </div>
    );
}
