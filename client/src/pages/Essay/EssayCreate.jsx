import React, { useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function EssayCreate() {
  const navigate = useNavigate();
  const [essayData, setEssayData] = useState({
    title: '',
    content: '',
  });

  // 인풋 이미지 태그 커스텀
  const imgRef = useRef(null);
  const [file, setFile] = useState(null);
  const [placeholder, setPlaceholder] = useState('첨부파일');

  const handleFileChange = (e) => {
    //못생긴 Input File의 onChange에 넣었던 함수!
    if (imgRef.current.value !== '') {
      //값이 텅 빈 것이 아니라면
      const fileName = imgRef.current.value; //현재 파일 값을 정의!
      setPlaceholder(fileName); //useState로 그 값을 placeholder에 넣기!
    } else {
      console.log('파일 없음');
    }
    setFile(e.target.files[0]);
  };

  // 제목, 내용 입력
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEssayData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // 폼 제출
  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', essayData.title);
    formData.append('content', essayData.content);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER}/essays`,
        formData,
        { withCredentials: true },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log(response.data);
      navigate(`/essay/detail/${response.data.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className='w-full h-full flex flex-col justify-center items-center'>
        {/* <div className='sm:text-4xl text-3xl font-bold mb-5 text-[#000000]'>
          백일장 작성
        </div> */}
        <form
          onSubmit={onSubmit}
          className='w-full max-w-2xl h-full flex flex-col justify-center items-center border'
          encType='multipart/form-data'
        >
          <div className='w-full h-full flex flex-col justify-center'>
            <label
              htmlFor='title'
              className='mx-3 mt-3 text-base text-gray-600 font-semibold'
            >
              제목
            </label>
            <input
              value={essayData.title}
              onChange={handleInputChange}
              name='title'
              type='text'
              placeholder='제목을 입력하세요.'
              required
              className='w-100 m-2 sm:h-12 h-9 p-2.5 sm:text-base text-xs block border rounded-lg text-gray-900 bg-gray-50 focus:outline-none focus:ring focus:ring-indigo-400'
            />
          </div>
          <div className='w-full h-full flex flex-col justify-center'>
            <div className='w-full h-full flex flex-row'>
              <label
                htmlFor='file'
                className='mx-3 mt-3 text-base text-gray-600 font-semibold'
              >
                사진 첨부
              </label>
              <label
                className='mx-3 mt-2 h-[2rem] inline-flex items-center justify-center px-2 py-2  text-white bg-signatureColor rounded-lg cursor-pointer hover:opacity-90'
                for='inputImg'
              >
                파일 업로드
              </label>
            </div>
            <input
              className='w-100 m-2 sm:h-12 h-9 p-2.5 sm:text-base text-xs block border rounded-lg text-gray-900 bg-gray-50 focus:outline-none focus:ring focus:ring-indigo-400'
              placeholder={placeholder}
              disabled
            />
            <input
              className='hidden'
              type='file'
              name='file'
              id='inputImg'
              ref={imgRef}
              onChange={handleFileChange}
              accept='*'
            />
          </div>

          <div className='w-full flex flex-col justify-center'>
            <label
              htmlFor=''
              className='mx-3 mt-3 text-base text-gray-600 font-semibold'
            >
              내용
            </label>
            <textarea
              rows='7'
              className='m-2 w-100 p-2 sm:text-base text-xs resize-none border rounded-lg text-gray-900 bg-gray-50 focus:outline-none focus:ring focus:ring-indigo-400'
              value={essayData.content}
              onChange={handleInputChange}
              name='content'
              type='text'
              placeholder='당신의 글 솜씨를 보여주세요!'
              required
            />
          </div>
          <div>
            <button
              type='submit'
              className='my-3 w-[10rem] h-[3rem] inline-flex items-center justify-center px-2 py-2  text-white bg-signatureColor rounded-lg hover:opacity-90'
            >
              백일장에 게시하기
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
