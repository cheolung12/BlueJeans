import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function TopNavbar() {
    const handleLogout = async () => {
        const res = await axios({
            method: 'GET',
            url: `${process.env.REACT_APP_SERVER}/logout`,
            withCredentials: true,
        });
        if (res.data === 'redirect:/login') {
            console.log('login');
            localStorage.clear();

            window.location.reload();
        } else {
            console.log('로그아웃 실패!');
        }
    };

    return (
        <nav className="bg-white  w-full z-50">
            <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl py-2 px-4">
                <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
                    <span className="self-center sm:text-4xl text-2xl  font-semibold whitespace-nowrap">BlueJeans</span>
                </Link>
                <div className="flex items-center space-x-6 rtl:space-x-reverse">
                    {!localStorage.getItem('isLogin') ? (
                        <Link to="/signup" className="sm:text-xl text-md font-semibold  text-black hover:underline">
                            회원가입
                        </Link>
                    ) : (
                        <Link to="/mypage" className="sm:text-xl text-md font-semibold  text-black hover:underline">
                            마이페이지
                        </Link>
                    )}
                    {!localStorage.getItem('isLogin') ? (
                        <Link to="/login" className="sm:text-xl text-md font-semibold  text-black hover:underline">
                            로그인
                        </Link>
                    ) : (
                        <div onClick={handleLogout} className="sm:text-xl text-md font-semibold  text-black hover:underline cursor-pointer">
                            로그아웃
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
