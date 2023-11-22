import React from 'react';
import DetailExample from '../../components/Recruitment/Detail/DetailExample';
import { useLocation } from 'react-router-dom';

export default function RecruitmentDetail({}) {
    const location = useLocation();

    console.log(location.state.dataDetail);

    return (
        <>
            <article className="flex flex-row justify-center">
                <DetailExample data={location} />
            </article>
        </>
    );
}
