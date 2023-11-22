import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function JobCard({ dataList }) {
    return (
        <>
            <div>
                <div>
                    {/* 데이터 표시 */}
                    <div class="flex justify-center flex-wrap">
                        {dataList.map((data) => (
                            <article class="w-96 h-48 justify-center" key={data.id}>
                                <Link class="flex flex-row justify-center" to={`/recruitment/detail/${data.id}`} state={{ dataDetail: data }}>
                                    <div class="bg-slate-400 w-1/2">
                                        <img class="rounded-md border-solid" src="" alt="이미지" />
                                    </div>
                                    <div class="bg-slate-500 w-2/3">
                                        <h2>{data.title}</h2>
                                        <div>{data.money}</div>
                                        <div>{data.region}</div>
                                        <div>{data.contact}</div>
                                    </div>
                                </Link>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
