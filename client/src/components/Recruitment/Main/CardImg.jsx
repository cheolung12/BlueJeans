import React from 'react';

export default function CardImg({ img }) {
    return (
        <>
            <div className="w-24 bg-slate-400">
                <img className="rounded-md border-solid" src={img} alt="이미지" />
            </div>
        </>
    );
}
