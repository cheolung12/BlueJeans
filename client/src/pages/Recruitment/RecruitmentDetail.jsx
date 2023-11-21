import React from 'react';
import DetailExample from '../../components/Recruitment/Detail/DetailExample';
import axios from 'axios';
import { useLocation, useParams } from 'react-router-dom';
import workC from '../../data/workC.json';
import LeftBar from '../../components/common/LeftBar';
import RightBar from '../../components/common/RightBar';

export default function RecruitmentDetail({}) {
    const location = useLocation();
    // const recruitParams = useParams();
    // const jobId = recruitParams.id;

    // console.log(recruitParams.id);
    // console.log(recruitParams.jobId);
    // console.log(recruitParams);
    // console.log(location.state.title);
    console.log(location.state);

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
