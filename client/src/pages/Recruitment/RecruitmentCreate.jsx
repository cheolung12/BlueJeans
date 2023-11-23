import React, { useState } from "react";
import axios from "axios";

export default function RecruitmentCreate() {
  const [recruitmentData, setRecruitmentData] = useState({
    title: "",
    money: "",
    region: "",
    content: "",
    contact: "",
  });
  const [file, setFile] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRecruitmentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("recruitDTO", JSON.stringify(recruitmentData));
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/jobs",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div>공고 게시</div>
      <form onSubmit={onSubmit} encType="multipart/form-data">
        <div>
          <label htmlFor="title">제목</label>
          <input
            value={recruitmentData.title}
            onChange={handleInputChange}
            name="title"
            type="text"
            placeholder="제목을 입력하세요."
            required
          />
          <br />
          <label htmlFor="money">급여</label>
          <input
            value={recruitmentData.money}
            onChange={handleInputChange}
            name="money"
            type="text"
            placeholder="급여를 입력하세요"
            required
          />
          <br />
          <label htmlFor="region">근무 지역</label>
          <input
            value={recruitmentData.region}
            onChange={handleInputChange}
            name="region"
            type="text"
            placeholder="근무 지역을 입력하세요"
            required
          />
          <br />
          <label htmlFor="contact">연락처</label>
          <input
            value={recruitmentData.contact}
            onChange={handleInputChange}
            name="contact"
            type="text"
            placeholder="연락처를 입력하세요"
            required
          />
          <br />
          <label htmlFor="file">근무지 사진 첨부</label>
          <input
            type="file"
            name="file"
            onChange={handleFileChange}
            accept="*"
          />
          <br />
          <label htmlFor="content">근무 설명</label>
          <textarea
            value={recruitmentData.content}
            onChange={handleInputChange}
            name="content"
            type="text"
            placeholder="해당 근무에 대한 설명을 입력하세요"
            required
          />
        </div>
        <div>
          <button type="submit">공고 게시하기</button>
        </div>
      </form>
    </div>
  );
}
