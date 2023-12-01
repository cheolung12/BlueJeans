import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function JobCard({ dataList }) {
    return (
        <>
            {/* 데이터 표시 */}
            <div className="flex flex-wrap justify-between fade-in">
                {dataList.map((data) => (
                    <div className="p-2 lg:w-1/2 w-full transition-transform hover:ease-linear transform hover:scale-105">
                        <Link
                            className="p-2 h-48 flex flex-row justify-center border rounded-lg shadow-md bg-green-50"
                            to={`/recruitment/detail/${data.id}`}
                        >
                            {/* key={data.id} state={{ dataDetail: data }} */}
                            <div class="m-1 w-1/2">
                                <img
                                    className=" w-full h-full object-none border border-solid rounded-lg "
                                    src={data.img_path}
                                    alt="근무 설명 이미지"
                                />
                            </div>
                            <div class="m-1 w-2/3 relative">
                                <div className="absolute left-0 top-0 text-start font-normal text-2xl block">{data.title}</div>
                                <div className="absolute top-1/2 block">
                                    <p className="ml-1 mb-2">{data.region}</p>
                                </div>
                                <div>
                                    <div className="absolute bottom-0 ml-1">
                                        {data.recruiting ? (
                                            <p className="w-[3rem] h-[2rem] mr-2 inline-flex items-center justify-center px-2 py-2 text-white bg-green-600 rounded-lg shadow-sm font-semibold">
                                                모집
                                            </p>
                                        ) : (
                                            <p className="w-[3rem] h-[2rem] mr-2 inline-flex items-center justify-center px-2 py-2 text-white bg-red-600 rounded-lg shadow-sm font-semibold">
                                                마감
                                            </p>
                                        )}
                                    </div>
                                    <div className="absolute bottom-0 right-0 text-end font-semibold text-xl">
                                        {data.moneyStandard} {data.money.toLocaleString()}원
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </>
    );
}
