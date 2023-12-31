import React from 'react';
import MyPagePosts from './MyPagePosts';
import MyPageForm from './MyPageForm';

export default function SideMenuContent({ sideMenu, userInfo, setUserInfo }) {
    const { myHome, myPost, myHeart } = sideMenu;

    return (
        <div className="lg:w-2/3 w-full h-full box-border px-8 overflow-hidden overflow-y-scroll">
            <div className="w-full h-full">
                {myHome ? (
                    <div className="space-y-3">
                        <div className="mt-3 text-blue-900 font-semibold lg:text-4xl text-2xl">회원 정보 수정</div>
                        <div className="pt-10 flex flex-col justify-center items-center ">
                            <MyPageForm userInfo={userInfo} setUserInfo={setUserInfo} />
                        </div>
                    </div>
                ) : (
                    <div />
                )}
                {myHeart ? (
                    <div className="w-full space-y-3">
                        <div className="w-full mt-3 mb-8 font-semibold lg:text-3xl text-2xl ">내가 찜한 게시물</div>
                        <div className="w-full">
                            <div className="w-full grid grid-cols-2 xl:grid-cols-3 gap-10">
                                <MyPagePosts postLists={userInfo.likedPost} />
                            </div>
                        </div>
                    </div>
                ) : (
                    <div />
                )}
                {myPost ? (
                    <div className="space-y-3">
                        <div className="mt-3 mb-8 font-semibold lg:text-3xl text-2xl ">내가 작성한 게시물</div>
                        <div className="w-full flex justify-start">
                            <div className="w-full grid grid-cols-2 xl:grid-cols-3 gap-10">
                                <MyPagePosts postLists={userInfo.writedPost} />
                            </div>
                        </div>
                    </div>
                ) : (
                    <div />
                )}
            </div>
        </div>
    );
}
