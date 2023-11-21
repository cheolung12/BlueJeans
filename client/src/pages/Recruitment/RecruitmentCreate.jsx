import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function RecruitmentCreate() {
    const [title, setTitle] = useState('');
    const [money, setMoney] = useState();
    const [region, setRegion] = useState('');
    const [workDay, setWorkDay] = useState('');
    const [workTime, setWorkTime] = useState('');
    const [content, setContent] = useState('');

    const titleChange = (e) => setTitle(e.target.value);
    const moneyChange = (e) => setMoney(e.target.value);
    const regionChange = (e) => setRegion(e.target.value);
    const workDayChange = (e) => setWorkDay(e.target.value);
    const workTimeChange = (e) => setWorkTime(e.target.value);
    const contentChange = (e) => setContent(e.target.value);

    const onSubmit = (e) => {
        e.preventDefault();

        // 폼 데이터 추가
        let formData = new FormData();

        formData.append('title', title);
        formData.append('money', money);
        formData.append('region', region);
        formData.append('workDay', workDay);
        formData.append('workTime', workTime);
        formData.append('content', content);

        formData.append('uploadFile', document.recruitForm.uploadFile.files[0]);

        // 폼 데이터 전송
        // axios
        //     .post('http://localhost:3000/recruitment/create', formData)
        //     .then((res) => {
        //         console.log(res.data);
        //         console.log('파일 전송 성공');
        //     })
        //     .catch(function (error) {
        //         console.log('파일 전송 실패');
        //     });

        // 콘솔 체크
        for (let data of formData.entries()) {
            console.log(data[0] + ': ' + data[1]);
        }
    };

    return (
        <div>
            <div>공고 게시</div>
            <form name="recruitForm" onSubmit={onSubmit} encType="multipart/form">
                <div>
                    <label htmlFor="title">제목</label>
                    <input value={title} onChange={titleChange} name="title" type="title" placeholder="제목을 입력하세요." required />
                    <br />
                    <label htmlFor="money">급여</label>
                    <input value={money} onChange={moneyChange} name="money" type="text" placeholder="급여를 입력하세요" required />
                    <br />
                    <label htmlFor="region">근무 지역</label>
                    <input value={region} onChange={regionChange} name="region" type="text" placeholder="근무 지역을 입력하세요" required />
                    <br />
                    <label htmlFor="workDay">근무 요일</label>
                    <input value={workDay} onChange={workDayChange} name="workDay" type="text" placeholder="근무 요일을 입력하세요" required />
                    <br />
                    <label htmlFor="workTime">근무 시간</label>
                    <input value={workTime} onChange={workTimeChange} name="workTime" type="text" placeholder="근무 시간을 입력하세요" required />
                    <br />
                    <label htmlFor="file">근무지 사진 첨부</label>
                    <input type="file" name="uploadFile" accept="*" />
                    <br />
                    <label htmlFor="content">근무 설명</label>
                    <textarea
                        value={content}
                        onChange={contentChange}
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
