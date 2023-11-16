import React from 'react';

export default function CardExplain({ title, money, region, contact }) {
    return (
        <>
            <div className="bg-slate-500 w-36">
                <h2>업무 이름---------{title}</h2>
                <div>급여-----------{money}</div>
                <div>지역-----------{region}</div>
                <div>연락처---------{contact}</div>
            </div>
        </>
    );
}
