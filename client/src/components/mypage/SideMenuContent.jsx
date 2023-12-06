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
                        <div className="py-5 flex flex-col justify-center items-center ">
                            <MyPageForm userInfo={userInfo} setUserInfo={setUserInfo} />
                        </div>
                    </div>
                ) : (
                    <div />
                )}
                {myHeart ? (
                    <div className="space-y-3">
                        <div className="mt-3 mb-8 font-semibold lg:text-3xl text-2xl ">내가 찜한 게시물</div>
                        <div className="w-full flex justify-start">
                            <div className="w-[580px] justify-items-center grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-2 lg:w-[580px] 2xl:w-[860px]">
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
                            <div className="w-[580px] justify-items-center grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-2 lg:w-[580px] 2xl:w-[860px]">
                                <MyPagePosts postLists={userInfo.writedPost} />
                            </div>
                        </div>
                    </div>
                ) : (
                    <div />
                )}
                {/**                        <div className="flex flex-wrap justify-center overflow-y-scroll max-h-[60vw]">
                 */}
            </div>
        </div>
    );
}
