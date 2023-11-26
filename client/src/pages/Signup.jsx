import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DaumPostcode from "react-daum-postcode";
import Modal from "react-modal";
import ImageSlider from "../components/common/ImageSlider";

export default function Signup() {
  const [formData, setFormData] = useState({
    userID: "",
    nickname: "",
    password: "",
    pwCheck: "",
    address: "",
  });

  // null: 비활성화, false: 유효성 검사 실패, true: 성공
  const [formValid, setFormValid] = useState({
    userID: null,
    nickname: null,
    password: null,
    address: null,
  });

  // formValid의 모든 요소가 true일경우 true를 나타냄
  const isFormValid = Object.values(formValid).every((value) => value === true);
  const [isOpen, setIsOpen] = useState(false); // 주소 모달창 열고 닫기
  const [isFormSubmitting, setIsFormSubmitting] = useState(false); // 가입버튼 재클릭 방지를 위한 state
  const navigate = useNavigate(); // 회원가입 성공 시 리다이렉트용

  const handleChange = (e) => {
    // input값 state에 실시간 적용
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // input별 유효성검사하기
    setFormValid((prevData) => {
      let updatedData = { ...prevData };
      if (name === "userID") {
        updatedData.userID = null;
      } else if (name === "nickname") {
        updatedData.nickname = null;
      } else if (name === "password") {
        updatedData.password = value === formData.pwCheck;
      } else if (name === "pwCheck") {
        updatedData.password = formData.password === value;
      }
      return updatedData;
    });
  };

  // 유효성 검사 실패시 사용자에게 테두리 스타일로 알려주기 (정의)
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 제출버튼 1초 이내 재클릭 방지
    if (!isFormSubmitting) {
      setIsFormSubmitting(true);
      setTimeout(() => {
        setIsFormSubmitting(false);
      }, 1000);
    }

    // 유효성 검사 실패시 사용자에게 테두리 스타일로 알려주기 (적용)
    if (!formValid.userID) {
      fadingEffect("id-duplication");
      return;
    } else if (!formValid.nickname) {
      fadingEffect("nickname-duplication");
      return;
    } else if (!formValid.password) {
      fadingEffect("pwCheck");
      return;
    } else if (!formValid.address) {
      fadingEffect("address");
      return;
    }

    // 회원가입 요청
    try {
      const res = await axios({
        method: "POST",
        // url: "https://www.bluejeansu.site/api/user",
        url: "http://localhost:8080/api/user",
        headers: {
          "Content-Type": "application/json",
        },
        data: formData,
      });
      if (res.data === "redirect:/login") {
        // 입력 정보로 바로 로그인할건지 선택
        const directLogin = window.confirm(
          "회원가입이 성공했습니다. 바로 로그인 하시겠습니까?"
        );
        if (directLogin) {
          // 폼 데이터로 변환
          const loginData = new FormData();
          loginData.append("userID", formData.userID);
          loginData.append("password", formData.password);
          // 로그인 요청
          try {
            const res = await axios({
              method: "POST",
              // url: "https://www.bluejeansu.site/login",
              url: "http://localhost:8080/login",
              data: loginData,
              withCredentials: true,
            });
            if (res) {
              console.log(res);
              sessionStorage.setItem("isLogin", true);
              sessionStorage.setItem("userID", res.data.userID);
              sessionStorage.setItem("nickname", res.data.nickname);
              sessionStorage.setItem("address", res.data.address);
              navigate("/");
            } else {
              navigate("/login");
            }
          } catch (error) {
            alert("로그인 실패");
            console.error(error);
          }
        } else {
          navigate("/login");
        }
      }
    } catch (error) {
      console.log(JSON.stringify(formData));
      console.error(error);
    }
  };

  // input에 spacebar 입력 방지용
  const blockSpace = (e) => {
    if (e.key === " ") {
      e.preventDefault();
    }
  };

  // 아이디 or 닉네임 중복 확인
  const checkDuplication = async (type) => {
    const value = formData[type];
    try {
      const res = await axios({
        method: "POST",
        // url: `https://www.bluejeansu.site/api/user/check?type=${type}&value=${value}`,
        url: `http://localhost:8080/api/user/check?type=${type}&value=${value}`,
      });
      // form 유효성 검사
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

  // 주소 modal 스타일
  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0,0,0,0.5)",
    },
    content: {
      left: "0",
      margin: "auto",
      width: "500px",
      height: "fit-content",
      padding: "0",
      overflow: "hidden",
    },
  };

  // 주소 modal 열고 닫기
  const modalToggle = () => {
    setIsOpen(!isOpen);
  };

  // 주소창 닫을때 입력값으로 설정
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
    <div className="w-screen h-screen flex">
      <ImageSlider />
      <div className="w-full h-full flex justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-2xl h-full flex flex-col justify-center items-center"
        >
          <div className="w-3/5 flex flex-col justify-start">
            <div className="sm:text-4xl text-3xl font-bold mb-2 text-[#2e375d]">
              회원가입
            </div>
            <div className="sm:text-base text-sm font-light sm:mb-8 mb-6">
              블루진스에 오신걸 환영합니다~!
            </div>
          </div>

          {/* 아이디 */}
          <div className="signup-input-wrapper">
            <div className="signup-input-header">
              <label htmlFor="userID" className="signup-input-label">
                아이디
              </label>
              {formValid.userID === true && (
                <span className="text-xs text-green-400">
                  사용가능한 ID입니다
                </span>
              )}
              {formValid.userID === false && (
                <span className="text-xs text-red-600">
                  다른ID를 입력해주세요
                </span>
              )}
            </div>
            <div className="signup-input-duplicable">
              <input
                type="text"
                id="userID"
                name="userID"
                value={formData.userID}
                onChange={handleChange}
                autoComplete="off"
                onKeyDown={blockSpace}
                placeholder="아이디를 입력해주세요."
                className="w-full h-full bg-inherit outline-none border-none focus:outline-none rounded-lg"
              />
              <button
                id="id-duplication"
                type="button"
                onClick={() => checkDuplication("userID")}
                className="sm:w-24 w-20 sm:h-8 h-6 border sm:text-sm text-xs bg-white rounded-md"
              >
                중복 확인
              </button>
            </div>
          </div>

          {/* 닉네임 */}
          <div className="signup-input-wrapper">
            <div className="signup-input-header">
              <label htmlFor="nickname" className="signup-input-label">
                닉네임
              </label>
              {formValid.nickname === true && (
                <span className="text-xs text-green-400">
                  사용가능한 닉네임입니다
                </span>
              )}
              {formValid.nickname === false && (
                <span className="text-xs text-red-600">
                  다른닉네임을 입력해주세요
                </span>
              )}
            </div>
            <div className="signup-input-duplicable">
              <input
                type="text"
                id="nickname"
                name="nickname"
                value={formData.nickname}
                onChange={handleChange}
                autoComplete="off"
                placeholder="닉네임을 입력해주세요."
                className="w-full h-full bg-inherit outline-none border-none focus:outline-none rounded-lg"
              />
              <button
                id="nickname-duplication"
                type="button"
                onClick={() => checkDuplication("nickname")}
                className="sm:w-24 w-20 sm:h-8 h-6 border sm:text-sm text-xs bg-white rounded-md"
              >
                중복 확인
              </button>
            </div>
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
              placeholder="비밀번호를 입력해주세요."
              className="signup-input"
            />
          </div>

          {/* 비밀번호 확인 */}
          <div className="signup-input-wrapper">
            <div className="signup-input-header">
              <label htmlFor="pwCheck" className="signup-input-label">
                비밀번호 확인
              </label>
              {formData.pwCheck && formData.password !== formData.pwCheck && (
                <span className="text-xs text-red-600">
                  비밀번호가 일치하지 않습니다.
                </span>
              )}
            </div>
            <input
              type="password"
              id="pwCheck"
              name="pwCheck"
              value={formData.pwCheck}
              onChange={handleChange}
              placeholder="비밀번호를 한번 더 입력해주세요."
              className="signup-input"
            />
          </div>

          {/* 주소 */}
          <div className="signup-input-wrapper">
            <div className="signup-input-header">
              <label htmlFor="address" className="signup-input-label">
                주소
              </label>
            </div>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              autoComplete="off"
              onClick={modalToggle}
              readOnly
              placeholder="클릭하면 주소검색창이 나타납니다."
              className="signup-input"
            />
            <Modal isOpen={isOpen} ariaHideApp={false} style={customStyles}>
              <DaumPostcode onComplete={completeHandler} height="100%" />
              <div className="flex justify-end pr-4">
                <button onClick={modalToggle}>[ 닫기 ]</button>
              </div>
            </Modal>
          </div>

          <div className="flex justify-center w-3/5 sm:mt-8 mt-6">
            <button
              type="submit"
              className={`sm:w-1/2 w-3/4 cursor-pointer bg-[#2e375d] font-semibold text-white text-xl  sm:py-4 py-3 rounded-lg ${
                isFormValid
                  ? "opacity-none cursor-pointer hover:opacity-95"
                  : "opacity-70 cursor-not-allowed"
              }`}
              disabled={isFormSubmitting}
            >
              가입 하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
