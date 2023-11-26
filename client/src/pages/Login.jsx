import React, { useState } from 'react';
import ImageSlider from '../components/common/ImageSlider';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const [formData, setFormData] = useState({
    userID: '',
    password: '',
  });
  const [isFail, setIsFail] = useState(false);
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
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

    if (formData.userID && formData.password) {
      const loginData = new FormData();
      loginData.append('userID', formData.userID);
      loginData.append('password', formData.password);
      try {
        const res = await axios({
          method: 'POST',
          url: 'http://localhost:8080/login',
          // url: "https://www.bluejeansu.site/login",
          data: loginData,
          withCredentials: true,
        });

        if (res) {
          sessionStorage.setItem('isLogin', true);
          sessionStorage.setItem('userID', res.data.userID);
          sessionStorage.setItem('nickname', res.data.nickname);
          sessionStorage.setItem('address', res.data.address);
          // res.responseURL
          navigate('/');
        } else {
          setIsFail(true);
        }
      } catch (error) {
        console.error(error);
      }
    } else if (!formData.userID) {
      fadingEffect('userID');
      return;
    } else if (!formData.password) {
      fadingEffect('password');
      return;
    }
  };

  return (
    <div className='w-screen h-screen flex'>
      <ImageSlider />
      <div className='w-full h-full flex justify-center items-center'>
        <form
          onSubmit={handleSubmit}
          className='w-full max-w-2xl h-full flex flex-col justify-center items-center'
        >
          <div className='w-3/5 flex flex-col justify-start'>
            <div className='sm:text-4xl text-3xl font-bold mb-2 text-signatureColor'>
              로그인
            </div>
            <div className='sm:text-base text-sm font-light sm:mb-8 mb-6'>
              블루진스에 오신걸 환영합니다~!
            </div>
          </div>

          {/* 아이디 */}
          <div className='signup-input-wrapper'>
            <div className='signup-input-header'>
              <label htmlFor='userID' className='signup-input-label'>
                아이디
              </label>
              {isFail && (
                <span className='text-xs text-red-600'>
                  아이디 또는 비밀번호가 올바르지 않습니다.
                </span>
              )}
            </div>
            <input
              type='text'
              id='userID'
              name='userID'
              value={formData.userID}
              onChange={handleChange}
              onKeyDown={blockSpace}
              placeholder='아이디를 입력해주세요.'
              className='signup-input'
            />
          </div>

          {/* 비밀번호 */}
          <div className='signup-input-wrapper'>
            <div className='signup-input-header'>
              <label htmlFor='password' className='signup-input-label'>
                비밀번호
              </label>
            </div>
            <input
              type='password'
              id='password'
              name='password'
              value={formData.password}
              onChange={handleChange}
              onKeyDown={blockSpace}
              placeholder='비밀번호를 입력해주세요.'
              className='signup-input'
            />
          </div>
          <div className='flex justify-center w-3/5 sm:mt-6 mt-4'>
            <button
              type='submit'
              disabled={isFormSubmitting}
              className={`w-full cursor-pointer bg-signatureColor font-semibold text-white text-xl sm:py-4 py-2 rounded-lg hover:opacity-90`}
            >
              로그인
            </button>
          </div>
          <div className='flex w-3/5 justify-between items-center  sm:mt-10 mt-8 sm:text-base text-xs box-boder'>
            <div className='sm:w-1/2 w-1/2 text-center sm:border-r-[2px] border-gray-200 font-semibold text-gray-500'>
              <Link to='/signup'>회원가입</Link>
            </div>
            <div className='sm:w-1/2 w-2/3 text-center font-semibold text-gray-500'>
              <Link>아이디/비밀번호 찾기</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
