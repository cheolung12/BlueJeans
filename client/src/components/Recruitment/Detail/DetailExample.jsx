import React from 'react';

export default function DetailExample({ id }) {
    return (
        <>
            <article>
                <section>
                    <div>============={id}번 일자리===============</div>
                    대충 이미지 섹션
                    <div>
                        <img src="" alt="직업 소개 이미지" />
                    </div>
                </section>
                <h1>대충 제목</h1>
                <hr />
                <section>
                    대충 설명 섹션
                    <div>대충 설명</div>
                </section>
            </article>
            {/* {title} {money} {region} {contact} */}
        </>
    );
}
