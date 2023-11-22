import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function JobCard({ dataList }) {
    return (
        <>
            {/* 데이터 표시 */}
            <div class="flex flex-wrap justify-between">
                {dataList.map((data) => (
                    <div className="p-2 w-1/2">
                        <Link
                            class="p-2 h-48 flex flex-row justify-center border rounded-lg shadow-md"
                            to={`/recruitment/detail/${data.id}`}
                            state={{ dataDetail: data }}
                            key={data.id}
                        >
                            <div class="m-1 w-1/2">
                                <img class=" w-full h-full border border-solid rounded-lg" src="" alt="근무 설명 이미지" />
                            </div>
                            <div class="m-1 w-2/3">
                                <div>{data.title}</div>
                                <div>{data.region}</div>

                                <div className=" text-end font-semibold text-2xl">{data.money}</div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </>
    );
}
