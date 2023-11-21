import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function RecruitCreate() {
    const navi = useNavigate();
    function backToList() {
        navi('/recruitment');
    }
    return (
        <>
            <section>
                <form method="post" action="/recruitment/create">
                    <div>
                        <label htmlFor="">제목</label>
                        <input name="title" type="title" placeholder="제목을 입력하세요." />
                        <label htmlFor="">급여</label>
                        <input name="money" type="text" placeholder="급여를 입력하세요" />
                        <label htmlFor="">근무 지역</label>
                        <input name="region" type="text" placeholder="근무 지역을 입력하세요" />
                        <label htmlFor="">근무 요일</label>
                        <input name="perDay" type="text" placeholder="근무 요일을 입력하세요" />
                        <label htmlFor="">근무 시간</label>
                        <input name="perTime" type="text" placeholder="근무 시간을 입력하세요" />
                        <label htmlFor=""></label>
                        <input type="file" accept="image/*" />
                        <label htmlFor="">설명</label>
                        <textarea name="content" type="text" placeholder="해당 근무에 대한 설명을 입력하세요" />
                    </div>
                    <div>
                        <button type="submit">공고 게시하기</button>
                        <button onClick={backToList}>취소</button>
                    </div>
                </form>
            </section>
        </>
    );
}
