import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SignupInput from '../components/signup/SignupInput';


export default function Signup() {
  const [formData, setFormData] = useState({
    userID: '',
    nickname: '',
    password: '',
    address: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
      if(res.data === 'redirect:/login'){
        navigate("/login");
      } 
    } catch (error) {
      console.log(JSON.stringify(formData))
      console.error(error);
    }
  };

  return (
    <div className='w-screen h-screen flex'>
      <div
        className='w-1/2 h-full'
        style={{
          backgroundImage: `url(/tempbg.png)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>
      <div className='w-1/2 h-full flex justify-center items-center'>
        <form
          onSubmit={handleSubmit}
          className='w-full h-full flex flex-col justify-center items-center'
        >
          <div className='w-3/5 flex flex-col justify-start'>
            <div className='text-3xl font-bold mb-2 text-[#2e375d]'>
              회원가입
            </div>
            <div className='text-base font-light mb-10'>
              블루진스에 오신걸 환영합니다~!
            </div>
          </div>
          <SignupInput
            type='text'
            label='아이디'
            name='userID'
            value={formData.userID}
            handleChange={handleChange}
          />
          <SignupInput
            type='text'
            label='닉네임'
            name='nickname'
            value={formData.nickname}
            handleChange={handleChange}
          />
          <SignupInput
            type='password'
            label='비밀번호'
            name='password'
            value={formData.password}
            handleChange={handleChange}
          />
          <div className='signup-input-wrapper'>
            <label htmlFor='password' className='signup-input-label'>
              비밀번호 확인
            </label>
            <input className='signup-input' />
          </div>
          <SignupInput
            type='text'
            label='주소'
            name='address'
            value={formData.address}
            handleChange={handleChange}
          />

          <div className='flex justify-center w-3/5 mt-11'>
            <button
              type='submit'
              className='w-1/2 cursor-pointer bg-[#2e375d] font-semibold text-white text-xl px-4 py-4 rounded-lg'
            >
              가입 하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
