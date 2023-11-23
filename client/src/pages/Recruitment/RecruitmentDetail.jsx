import React, { useState } from 'react';
import DetailExample from '../../components/Recruitment/Detail/DetailExample';
import { Link, useLocation } from 'react-router-dom';
import ResButton from '../../components/common/ResButton';

export default function RecruitmentDetail({}) {
    const location = useLocation();
    console.log(location.state.dataDetail);

    // 권한 여부
    const [editA, setEditA] = useState(true);
    // if ('권한있으면') {
    //     setEditA(true);
    // } else if ('권한없으면') {
    //     setEditA(false);
    // }

    function editRecruit() {
        console.log('공고 수정');
    }
    function deleteRecruit() {
        console.log('공고 삭제');
    }

    return (
        <>
            <div className="w-full flex justify-center">
                <section className="max-w-4xl block">
                    <DetailExample data={location} />
                    <nav className="flex justify-end">
                        {editA ? (
                            <div className="flex flex-row  space-x-2">
                                <button onClick={editRecruit()}>수정</button>
                                <button onClick={deleteRecruit()}>삭제</button>
                                <Link to={`/recruitment`}>
                                    <ResButton text="목록" />
                                </Link>
                            </div>
                        ) : (
                            <Link to={`/recruitment`}>
                                <ResButton text="목록" />
                            </Link>
                        )}
                    </nav>
                </section>
            </div>
        </>
    );
}
