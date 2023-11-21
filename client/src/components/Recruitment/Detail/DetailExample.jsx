import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function DetailExample({ data }) {
    const [editA, setEditA] = useState(true); // 권한 여부
    // if ('권한있으면') {
    //     setEditA(true);
    // } else if ('권한없으면') {
    //     setEditA(false);
    // }
    function editRecruit() {}
    function deleteRecruit() {}
    return (
        <>
            <section className="w-3/5">
                <div>============={data.state.dataDetail.id}번 일자리===============</div>
                대충 이미지 섹션
                <div>
                    <img src="" alt="직업 소개 이미지" />
                </div>
                <hr />
                <h1>대충 제목</h1>
                <section>
                    대충 설명 섹션
                    <div>대충 설명</div>
                </section>
                <section>
                    {editA ? (
                        <div>
                            <button onClick={editRecruit()}>수정</button>
                            <button onClick={deleteRecruit()}>삭제</button>
                            <Link to={`/recruitment`}>목록</Link>
                        </div>
                    ) : (
                        <Link to={`/recruitment`}>목록</Link>
                    )}
                </section>
            </section>
            {/* {title} {money} {region} {contact} */}
        </>
    );
}
