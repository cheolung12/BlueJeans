import React from 'react';
import DetailExample from '../../components/Recruitment/Detail/DetailExample';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import workC from '../../data/workC.json';

export default function RecruitmentDetail({}) {
    const recruitParams = useParams();
    // const jobId = recruitParams.id;

    // console.log(recruitParams.id);
    console.log(recruitParams.jobId);

    return (
        <>
            <DetailExample id={recruitParams.jobId} />
        </>
    );
}
