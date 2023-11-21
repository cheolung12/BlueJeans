import React from 'react';
import DetailExample from '../../components/Recruitment/Detail/DetailExample';
import { useLocation } from 'react-router-dom';
// import workC from '../../data/workC.json';
// import LeftBar from '../../components/common/LeftBar';
import RightBar from '../../components/common/RightBar';

export default function RecruitmentDetail({}) {
    const location = useLocation();

    console.log(location.state.dataDetail);

    return (
        <>
            <article className="flex flex-row justify-center">
                <section>왼쪽 바</section>
                <DetailExample data={location} />
                <RightBar />
            </article>
        </>
    );
}
