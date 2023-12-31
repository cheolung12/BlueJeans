import React, { useEffect, useState } from 'react';
import ImageSlider from '../components/common/ImageSlider';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
    const [formData, setFormData] = useState({
        userID: 'bluejeans',
        password: 'wlstn123',
    });
    const [isFail, setIsFail] = useState(false);
    const [isFormSubmitting, setIsFormSubmitting] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    const navigate = useNavigate();

    function fadingEffect(elementId) {
        const element = document.getElementById(elementId);
        let opacity = 1;
        const fadingInterval = setInterval(() => {
            element.style.outline = `2px solid rgba(235, 56, 56, ${opacity})`;
            opacity -= 0.05;
            if (opacity <= 0) {
                clearInterval(fadingInterval);
            }
        }, 100);
    }
    useEffect(() => {
        let bluejeansId = getCookie('BlueJeans_id');
        console.log(bluejeansId);
        if (bluejeansId) {
            setIsChecked(true);
            setFormData({ userID: bluejeansId });
        }
    }, []);

    const blockSpace = (e) => {
        if (e.key === ' ') {
            e.preventDefault();
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        if (isFail) {
            setIsFail((prev) => !prev);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isFormSubmitting) {
            setIsFormSubmitting(true);
            setTimeout(() => {
                setIsFormSubmitting(false);
            }, 1000);
        }

        if (isChecked) {
            //아이디 저장 체크되어있는경우
            setCookie('BlueJeans_id', formData.userID, 7); // 쿠키에 저장하는 이벤트를 호출 bluejeans_id 이름으로 id가 7일동안 저장
        } else {
            // 체크가 해제 된 경우 (false)
            deleteCookie('BlueJeans_id'); // 쿠키 정보를 지우는 이벤트를 호출한다.
        }

        if (formData.userID && formData.password) {
            const loginData = new FormData();
            loginData.append('userID', formData.userID);
            loginData.append('password', formData.password);
            try {
                const res = await axios({
                    method: 'POST',
                    url: `${process.env.REACT_APP_DOMAIN}/login`,
                    data: loginData,
                    withCredentials: true,
                });
                console.log(res);
                if (res.data !== 'login') {
                    localStorage.setItem('isLogin', true);
                    localStorage.setItem('userID', res.data.userID);
                    localStorage.setItem('nickname', res.data.nickname);
                    localStorage.setItem('address', res.data.address);
                    // res.responseURL
                    navigate('/');
                } else {
                    setIsFail(true);
                }
            } catch (error) {
                setIsFail(true);
            }
        } else if (!formData.userID) {
            fadingEffect('userID');
            return;
        } else if (!formData.password) {
            fadingEffect('password');
            return;
        }
    };

    /////////쿠키관련

    //쿠키저장
    function setCookie(cookieName, value, exdays) {
        let exdate = new Date();
        exdate.setDate(exdate.getDate() + exdays); // 쿠키 저장 기간
        let cookieValue = escape(value) + (exdays == null ? '' : '; expires=' + exdate.toGMTString());
        document.cookie = cookieName + '=' + cookieValue;
    }

    //쿠키 조회
    function getCookie(cookieName) {
        cookieName = cookieName + '=';
        let cookieData = document.cookie;
        let start = cookieData.indexOf(cookieName);
        let cookieValue = '';

        if (start !== -1) {
            start += cookieName.length;
            let end = cookieData.indexOf(';', start);
            if (end === -1) end = cookieData.length;
            cookieValue = cookieData.substring(start, end);
        }
        return unescape(cookieValue);
    }

    //쿠키삭제
    function deleteCookie(cookieName) {
        let expireDate = new Date();
        expireDate.setDate(expireDate.getDate() - 1);
        document.cookie = cookieName + '= ' + '; expires=' + expireDate.toGMTString();
    }

    return (
        <div className="w-screen h-screen flex">
            <Link
                to="/"
                className="fixed top-4 left-4 self-center sm:text-4xl text-2xl  font-semibold whitespace-nowrap"
                style={{ fontFamily: 'Fredoka, sans-serif' }}
            >
                BlueJeans
            </Link>

            <ImageSlider />
            <div className="w-full h-full flex justify-center items-center">
                <form onSubmit={handleSubmit} className="w-full max-w-2xl h-full flex flex-col justify-center items-center">
                    <div className="w-3/5 flex flex-col justify-start">
                        <div className="sm:text-4xl text-3xl font-bold mb-2 text-gray-600">로그인</div>
                        <div className="sm:text-base text-sm font-light sm:mb-8 mb-6">블루진스에 오신걸 환영합니다~!</div>
                    </div>

                    {/* 아이디 */}
                    <div className="signup-input-wrapper">
                        <div className="signup-input-header">
                            <label htmlFor="userID" className="signup-input-label">
                                아이디
                            </label>
                            {isFail && <span className="text-xs text-red-600">아이디 또는 비밀번호가 올바르지 않습니다.</span>}
                        </div>
                        <input
                            type="text"
                            id="userID"
                            name="userID"
                            value={formData.userID}
                            onChange={handleChange}
                            onKeyDown={blockSpace}
                            placeholder="아이디를 입력해주세요."
                            className="signup-input"
                        />
                    </div>

                    {/* 비밀번호 */}
                    <div className="signup-input-wrapper">
                        <div className="signup-input-header">
                            <label htmlFor="password" className="signup-input-label">
                                비밀번호
                            </label>
                        </div>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            onKeyDown={blockSpace}
                            placeholder="비밀번호를 입력해주세요."
                            className="signup-input"
                        />
                    </div>
                    <div class="flex items-center w-3/5 justify-start  mt-1 ml-2 ">
                        <input
                            id="rememberId"
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => {
                                setIsChecked(!isChecked);
                            }}
                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label for="default-checkbox" class="ms-2 text-sm font-medium text-gray-500 dark:text-gray-300">
                            아이디 기억하기
                        </label>
                    </div>
                    <div className="flex justify-center w-3/5 sm:mt-6 mt-4">
                        <button
                            type="submit"
                            disabled={isFormSubmitting}
                            className={`w-full cursor-pointer bg-signatureColor font-semibold text-white text-xl sm:py-4 py-2 rounded-lg hover:opacity-90`}
                        >
                            로그인
                        </button>
                    </div>
                    <div className="flex w-3/5 justify-between items-center  sm:mt-10 mt-8 sm:text-base text-xs box-boder">
                        <div className="sm:w-1/2 w-1/2 text-center sm:border-r-[2px] border-gray-200 font-semibold text-gray-500">
                            <Link to="/signup">회원가입</Link>
                        </div>
                        <div className="sm:w-1/2 w-2/3 text-center font-semibold text-gray-500">
                            <Link>아이디/비밀번호 찾기</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
