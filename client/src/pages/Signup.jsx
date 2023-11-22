import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DaumPostcode from 'react-daum-postcode';
import Modal from 'react-modal';

export default function Signup() {
  const [formData, setFormData] = useState({
    userID: '',
    nickname: '',
    password: '',
    pwCheck: '',
    address: '',
  });
  // null: 비활성화, false: 유효성 검사 실패, true: 성공
  const [formValid, setFormValid] = useState({
    userID: null,
    nickname: null,
    password: null,
    address: null,
  });
  const isFormValid = Object.values(formValid).every((value) => value === true);
  const [isOpen, setIsOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const imageUrls = ['/images/s1.jpeg', '/images/s2.jpeg', '/images/s3.jpeg', '/images/s4.jpeg'];
  const currentImageUrl = imageUrls[currentImageIndex];
  const navigate = useNavigate();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
    }, 3000);
    return () => clearInterval(intervalId);
  }, [currentImageIndex]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    
    setFormValid((prevData) => {
      let updatedData = { ...prevData };
      if(name === 'userID') {
        updatedData.userID = null;
      } else if(name === 'nickname') {
        updatedData.nickname = null;
      }
      else if (name === 'password') {
        updatedData.password = value === formData.pwCheck;
      } else if (name === 'pwCheck') {
        updatedData.password = formData.password === value;
      }
      return updatedData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios({
        method: 'POST',
        url: 'http://localhost:8080/api/user',
        headers: {
          'Content-Type': 'application/json',
        },
        data: formData,
      });
      console.log(res.data);
      if (res.data === 'redirect:/login') {
        navigate('/login');
      }
    } catch (error) {
      console.log(JSON.stringify(formData));
      console.error(error);
    }
  };

  const blockSpace = (e) => {
    if (e.key === ' ') {
      e.preventDefault();
    }
  };

  const checkDuplication = async (type) => {
    const value = formData[type];
    try {
      const res = await axios({
        method: 'POST',
        url: `http://localhost:8080/api/user/check?type=${type}&value=${value}`,
      });
      if (!res.data) {
        setFormValid((prevData) => ({
          ...prevData,
          [type]: true,
        }));
      } else {
        setFormValid((prevData) => ({
          ...prevData,
          [type]: false,
        }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Modal 스타일
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

  const modalToggle = () => {
    setIsOpen(!isOpen);
  };

  // 주소 설정
  const completeHandler = (data) => {
    setFormData((prevData) => ({
      ...prevData,
      address: data.roadAddress,
    }));
    setFormValid((prevData) => ({
      ...prevData,
      address: true,
    }));
    setIsOpen(false);
  };


  return (
    <div className='w-screen h-screen flex'>
      <div
        className='w-[1000px] h-full lg:block hidden'
        style={{
          backgroundImage: `url(${currentImageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transition: 'background-image 1s ease-in-out',
        }}
      ></div>
      <div className='w-full h-full flex justify-center items-center'>
        <form
          onSubmit={handleSubmit}
          className='w-full max-w-2xl h-full flex flex-col justify-center items-center'
        >
          <div className='w-3/5 flex flex-col justify-start'>
            <div className='text-4xl font-bold mb-2 text-[#2e375d]'>
              회원가입
            </div>
            <div className='text-base font-light mb-10'>
              블루진스에 오신걸 환영합니다~!
            </div>
          </div>

          {/* 아이디 */}
          <div className='signup-input-wrapper'>
            <div className='signup-input-header'>
              <label htmlFor='userID' className='signup-input-label'>
                아이디
              </label>
              {formValid.userID === true && (
                <span className='text-xs text-green-400'>
                  사용가능한 ID입니다
                </span>
              )}
              {formValid.userID === false && (
                <span className='text-xs text-red-600'>
                  다른ID를 입력해주세요
                </span>
              )}
            </div>
            <div className='signup-input-duplicable'>
              <input
                type='text'
                id='아이디'
                name='userID'
                value={formData.userID}
                onChange={handleChange}
                autoComplete='off'
                onKeyDown={blockSpace}
                className='w-full h-full bg-inherit outline-none border-none focus:outline-none rounded-lg'
              />
              <button
                type='button'
                onClick={() => checkDuplication('userID')}
                className='w-24 h-8 border text-sm bg-white rounded-md '
              >
                중복 확인
              </button>
            </div>
          </div>

          {/* 닉네임 */}
          <div className='signup-input-wrapper'>
            <div className='signup-input-header'>
              <label htmlFor='nickname' className='signup-input-label'>
                닉네임
              </label>
              {formValid.nickname === true && (
                <span className='text-xs text-green-400'>
                  사용가능한 닉네임입니다
                </span>
              )}
              {formValid.nickname === false && (
                <span className='text-xs text-red-600'>
                  다른닉네임을 입력해주세요
                </span>
              )}
            </div>
            <div className='signup-input-duplicable'>
              <input
                type='text'
                id='nickname'
                name='nickname'
                value={formData.nickname}
                onChange={handleChange}
                autoComplete='off'
                className='w-full h-full bg-inherit outline-none border-none focus:outline-none rounded-lg'
              />
              <button
                type='button'
                onClick={() => checkDuplication('nickname')}
                className='w-24 h-8 border text-sm bg-white rounded-md'
              >
                중복 확인
              </button>
            </div>
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
              className='signup-input'
            />
          </div>

          {/* 비밀번호 확인 */}
          <div className='signup-input-wrapper'>
            <div className='signup-input-header'>
              <label htmlFor='pwCheck' className='signup-input-label'>
                비밀번호 확인
              </label>
              {formData.pwCheck && formData.password !== formData.pwCheck && (
                <span className='text-xs text-red-600'>
                  비밀번호가 일치하지 않습니다.
                </span>
              )}
            </div>
            <input
              type='password'
              id='pwCheck'
              name='pwCheck'
              value={formData.pwCheck}
              onChange={handleChange}
              className='signup-input'
            />
          </div>

          {/* 주소 */}
          <div className='signup-input-wrapper'>
            <div className='signup-input-header'>
              <label htmlFor='address' className='signup-input-label'>
                주소
              </label>
            </div>
            <input
              type='text'
              id='address'
              name='address'
              value={formData.address}
              onChange={handleChange}
              autoComplete='off'
              onClick={modalToggle}
              readOnly
              className='signup-input'
            />
            <Modal isOpen={isOpen} ariaHideApp={false} style={customStyles}>
              <DaumPostcode onComplete={completeHandler} height='100%' />
              <div className='flex justify-end pr-4'>
                <button onClick={modalToggle}>[ 닫기 ]</button>
              </div>
            </Modal>
          </div>

          <div className='flex justify-center w-3/5 mt-11'>
            <button
              type='submit'
              className={`w-1/2 cursor-pointer bg-[#2e375d] font-semibold text-white text-xl px-4 py-4 rounded-lg ${
                isFormValid
                  ? 'opacity-none cursor-pointer hover:opacity-95'
                  : 'opacity-70 cursor-auto'
              }`}
              disabled={!isFormValid}
            >
              가입 하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
