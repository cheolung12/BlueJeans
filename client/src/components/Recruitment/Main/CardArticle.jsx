import React from 'react';
import workC from '../../../data/workC.json';
// import CardExplain from './CardExplain';
// import CardImg from './CardImg';

const works = workC.works;

export default function CardArticle({ link, img }) {
    return (
        <>
            {works.map((works) => (
                <article className="w-96 h-48 justify-items-center justify-center">
                    <a className="flex flex-row" href={link}>
                        <div className="bg-slate-400 basis-1/2">
                            <img className="rounded-md border-solid" src={img} alt="이미지" />
                        </div>
                        <div className="bg-slate-500 basis-2/3 ">
                            <h2>{works.title}</h2>
                            <div>{works.money}</div>
                            <div>{works.region}</div>
                            <div>{works.contact}</div>
                        </div>
                    </a>
                </article>
            ))}
        </>
    );
}
