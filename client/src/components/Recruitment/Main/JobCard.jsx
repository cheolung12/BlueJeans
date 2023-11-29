import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function JobCard({ dataList }) {
    return (
        <>
            {/* 데이터 표시 */}
            <div className="flex flex-wrap justify-between">
                {dataList.map((data) => (
                    <div className="p-2 lg:w-1/2 w-full transition-transform hover:ease-linear transform hover:scale-105">
                        <Link
                            className="p-2 h-48 flex flex-row justify-center border rounded-lg shadow-md"
                            to={`/recruitment/detail/${data.id}`}
                            state={{ dataDetail: data }}
                            key={data.id}
                        >
                            <div class="m-1 w-1/2">
                                <img
                                    className=" w-full h-full object-none border border-solid rounded-lg "
                                    src={data.img_path}
                                    alt="근무 설명 이미지"
                                />
                            </div>
                            <div>{data.recruiting ? '모집중' : '마감'}</div>
                            <div class="m-1 w-2/3 relative">
                                <div className="absolute left-0 top-0 text-start font-normal text-2xl block">{data.title}</div>
                                <div className="absolute top-1/2 block">
                                    <p className="m-1">{data.region}</p>
                                </div>
                                <div className="absolute bottom-0 right-0 text-end font-semibold text-2xl">{data.moneyStandard}</div>
                                <div className="absolute bottom-0 right-0 text-end font-semibold text-2xl">{data.money}원</div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </>
    );
}
