import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import DaumPostcode from 'react-daum-postcode';
import Modal from 'react-modal';

export default function RecruitmentEdit({ data }) {
    const [recruitmentEditData, setRecruitmentEditData] = useState({
        title: data.title,
        moneyStandard: data.moneyStandard,
        money: data.money,
        region: data.region,
        content: data.content,
        contact: data.contact,
        workDay: data.workDay,
        workTime: data.workTime,
    });

    return (
        <>
            <article>수정페이지</article>
        </>
    );
}
