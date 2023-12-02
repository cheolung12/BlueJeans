import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function JobCard({ dataList }) {
    return (
        <>
            {/* 데이터 표시 */}
            <div className="flex flex-wrap justify-between fade-in">
                {dataList.map((data) => (
                    <div className="p-2 lg:w-1/2 w-full transition-transform hover:ease-linear transform md:hover:scale-105 hover:scale-100">
                        <Link
                            className="p-2 sm:h-48 h-40 flex flex-row justify-center md:border border-none md:rounded-lg rounded-none md:shadow-md shadow-none"
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
                                <div className="absolute left-0 top-0 text-start font-semibold sm:text-xl text-lg block">{data.title}</div>
                                <div className="absolute sm:top-1/2 top-16 block">
                                    <p className="ml-1 mb-2 sm:text-base text-sm">{data.region}</p>
                                </div>
                                <div>
                                    <div className="absolute bottom-0 ml-1">
                                        {data.recruiting ? (
                                            <p className="sm:w-[3rem] w-[2.8rem] sm:h-[2rem] h-[1.8rem] mr-2 inline-flex items-center justify-center px-2 py-2 text-white bg-green-600 rounded-lg shadow-sm font-semibold sm:text-base text-sm">
                                                모집
                                            </p>
                                        ) : (
                                            <p className="sm:w-[3rem] w-[2.8rem] sm:h-[2rem] h-[1.8rem] mr-2 inline-flex items-center justify-center px-2 py-2 text-white bg-red-600 rounded-lg shadow-sm font-semibold sm:text-base text-sm">
                                                마감
                                            </p>
                                        )}
                                    </div>
                                    <div className="absolute bottom-0 right-0 text-end font-semibold sm:text-xl text-lg">
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
